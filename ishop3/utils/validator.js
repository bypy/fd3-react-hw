const checkName = str => {
  let err = [];
  if (str.length === 0) err.push('Укажите название продукта');
  else if (str.trim().length === 0)
    err.push('Название продукта не может содержать только пробелы');

  return err;
};


const checkPrice = num => {
  let err = [];
  // в связи с тем, что при инициализации компонента поступают
  // как положено __числа__ для стоимости и количества
  // а при валидации происходит проверка строковых значений ->
  // для единообразия поступающие числа преобразоваем в текст
  
  // после проверки на валидность и сохранения данные карточки будут приводиться к требуемым типам 

  if (typeof num === 'number')
    num = num.toString();

  if (num.trim().length === 0)
    err.push('Укажите стоимость продукта в числовом выражении');
  else if (/[\,]/.test(num))
    err.push('Вместо запятой используйте символ точки для отделения дробной части от целой');
  else if ( isNaN(Number(num)) )
    err.push('Укажите стоимость продукта в числовом выражении');
  else if (parseFloat(num) <= 0)
    err.push('Для стоимости необходимо указать положительное число больше нуля');

  return err;
};


const checkUrl = url => {
  let err = [];
  if (url.trim().length === 0)
    err.push('Укажите ссылку на изображение товара');
  else if (!( createRegexByType('url').test(url)))
    err.push('Проверьте URL на ошибки и исправьте');
  
  return err;
};


const checkQuantity = quantity => {
  let err = [];

  // в связи с тем, что при инициализации компонента поступают
  // как положено __числа__ для стоимости и количества
  // а при валидации происходит проверка строковых значений ->
  // для единообразия поступающие числа преобразоваем в текст
  
  // после проверки на валидность и сохранения данные карточки будут приводиться к требуемым типам 

  if (typeof quantity === 'number')
    quantity = quantity.toString();

  if (quantity.trim().length === 0)
    err.push('Укажите количества продукта в числовом выражении');
  else if (/[\.\,]/.test(quantity))
    err.push('Для количества продукта принимаются только целые числа');
  else if (isNaN(Number(quantity)))
    err.push('Введите неотрицательное целое число');
  else if (parseFloat(quantity) < 0)
    err.push('В этой таблице количество не может быть отрицательным');

  return err;
};


// возвращает объект регулярного выражения
// в соответствии с переданным типом валидируемого поля
const createRegexByType = (fieldType) => {
  let reS = '';

  if (fieldType === 'url') {
    reS += '^'; // начало строки
    reS += 'https?'; // обязательный протокол (с опциональным символом 's' в конце)
    reS += '\\:\\/\\/'; // протокол последовательность символов ://
    reS += '(w{3}\\.){0,1}'; // 0 или 1 раз повторяющаяся последовательность из 3 символов 'w', заканчивающаяся точкой

    reS += '(?:'; // опциональная группа без захвата
    reS += '[a-zа-я0-9]{1,63}\\.'; // доменное имя третьего уровня длиной от 1 до 63 символов, заканчивающееся точкой
    reS += ')?'; //

    reS += '[a-zа-я0-9]'; // первый символ имени домена второго уровня - последовательность символов букв, цифр, исключен знак тире
    reS += '[a-zа-я0-9\\-]{0,61}'; // последовательность символов букв, цифр и тире длиной от 0 до 61
    reS += '[a-zа-я0-9]'; // последний (второй из двух) символ имени домена второго уровня - последовательность символов букв, цифр, исключен знак тире
    reS += '\\.'; // точка, отделяющая домен второго уровня от домена верхнего уровня
    reS += '[a-zа-я]{2,18}'; // домен верхнего уровня длиной минимум 2 символа, максимум 18 символов (длиннее не нашел)
    reS += '\\/?'; // необязательный слеш перед частью пути к ресурсу

    reS += '(?:'; // группа без захвата с предопределенным количеством повторов
    reS += '[a-zа-я0-9_\\-]{1,50}'; // название части пути к ресурсу длиной от 1 до 50 символов (50 взял навскидку)
    reS += '\\/?'; // необязательный слеш после части пути к ресурсу. при отстутствии имени ресурса - закрывает URL
    reS += '){0,2}'; // задаю глубину вложенности ресурса в диапазоне от 0 до 2

    reS += '(?:'; // опциональная группа без захвата
    reS += '[a-zа-я0-9_\\-]{1,50}'; // название ресурса от 1 до 50 символов длиной из букв, цифр, подчеркивания или тире
    reS += '\\.'; // точка, разделяющая имя и расширение ресурса
    reS += '(html|htm|php|asp|jsp|jpg|jpeg|png|gif|webp)'; // вот это вот лишнее, ввел чтобы применить оператор ИЛИ
    reS += ')?'; //

    reS += '$'; // конец строки
  } else if (fieldType === 'email') {
    reS += '^'; // начало строки
    reS += '[a-z0-9_\\-\\.]+'; // имя ящика - один и более символов из цифр, латинских букв или знаки ._-
    reS += '@'; // отделяет название ящика от доменного имени

    reS += '(?:'; // группа без захвата с предопределенным количеством повторов
    reS += '[a-z0-9\\-]+\\.'; // доменное имя с точкой в конце
    reS += '){1,2}'; // доменное имя может быть ограничено третьим уровнен
    reS += '[a-z0-9]{2,}$'; // доменное имя верхнего уровня длиной от 2-х цифр или латинских букв

    reS += '$'; // конец строки
  } else if (fieldType === 'double-special') {
    reS += '([_\\.\\-])(?:\\1)'; // находит два стоящих подряд нижнех подчеркивания или тире
  } else if (fieldType === 'domain') {
    reS += '(?:'; // группа БЕЗ захвата с предопределенным количеством повторов
    reS += 'w{3}\\.'; // www с точкой в конце
    reS += '){0,1}'; // ноль или одно повторение

    reS += '(?:'; // группа БЕЗ захвата
    reS += '[a-zа-я0-9]{1,63}\\.'; // доменное имя третьего уровня длиной от 1 до 63 символов, заканчивающееся точкой
    reS += ')?';

    reS += '('; // группа с захватом (искомый домен)
    reS += '[a-zа-я0-9]'; // первая буква доменного имени (не может быть тире)
    reS += '[a-zа-я0-9\\-]{0,61}'; // продложение домена второго уровня
    reS += '[a-zа-я0-9]\\.'; // заключительная буква доменного имени (не может быть тире) с точкой в конце
    reS += '[a-zа-я]{2,18}'; // TLD
    reS += ')';
  }

  return new RegExp(reS, 'i'); // ! нечувствительность к регистру в флаге 'i'
}

module.exports.isError = {
  checkName,
  checkPrice,
  checkUrl,
  checkQuantity
};