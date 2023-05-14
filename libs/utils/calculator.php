<?php
if ($argc != 3) {
  echo "Usage: php calculator.php <number1> <number2>\n";
  exit(1);
}

$number1 = $argv[1];
$number2 = $argv[2];

$result = $number1 * $number2;

echo "Result: $result\n";
?>
