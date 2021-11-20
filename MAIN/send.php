<?php

// Шаг 1
$free_time = $_POST['free_time']; // вытаскиваем свободное время в течение дня
// Шаг 2
$money_exp = $_POST['money_exp']; // вытаскиваем наличие опыта удаленного заработка
// Шаг 3
$open_new = $_POST['open_new']; // вытаскиваем открытость новому опыту
// Шаг 4
$salary = $_POST['salary']; // вытаскиваем зарплатные ожидания
// Шаг 5
$name = $_POST['name']; // вытаскиваем имя
// Шаг 6
$phone = $_POST['phone']; // вытаскиваем телефон

$to = 'egyabig2@gmail.com';
$from = "egyabig2@gmail.com"; // От кого пришло письмо
$subject = 'Заявка с формы СКВИЗ';
$message = "Имя: " . $name . "\r\n" . "Номер: " . $phone;

$headers = "From: $from\r\nReply-To: $to\r\nContent-type: text/html; charset=utf-8\r\n"; // Формируем заголовок письма (при неправильном формировании может ломаться кодировка и т.д.)

if (mail($to, $subject, $message, $headers)) { // При помощи функции mail, отправляем сообщение, проверяя отправилось оно или нет
//    echo "<p>Сообщение успешно отправлено</p>"; // Отправка успешна
    ob_start();
    header("Location: index.html");
    die();
} else {
    echo "<p>Что-то пошло не так, как планировалось</p>"; // Письмо не отправилось
}

