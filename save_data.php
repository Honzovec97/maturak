<?php
header("Content-Type: application/json");

// Připojení k databázi
$servername = "	sql303.infinityfree.com";
$username = "if0_37628441";       // Nahraďte svým MySQL uživatelským jménem
$password = "P8j$UcNuV34geU!";       // Nahraďte svým MySQL heslem
$dbname = "if0_37628441_data";         // Nahraďte názvem vaší databáze

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Chyba při připojení k databázi: " . $conn->connect_error);
}

// Získání dat z formuláře
$name = $_POST["name"] ?? '';
$number = $_POST["number"] ?? '';

if (empty($name) || empty($number)) {
    echo "Jméno a číslo jsou povinné";
    exit();
}

// Vložení dat do tabulky `data` se statusem 'ÚSPĚŠNĚ ZAREGISTROVÁN'
$sql = "INSERT INTO data (name, number, status) VALUES (?, ?, 'ÚSPĚŠNĚ ZAREGISTROVÁN')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $number);

if ($stmt->execute()) {
    echo "ÚSPĚŠNĚ JSI SE ZAREGISTROVAL POD JMÉNEM $name A ČÍSLEM $number";
} else {
    echo "Chyba při ukládání do databáze";
}

$stmt->close();
$conn->close();
?>