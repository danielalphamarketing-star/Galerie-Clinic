<?php
// =====================================================
// GALERIE CLINIC - Send Email Script
// Envia leads do formulário para os e-mails configurados
// =====================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Se for OPTIONS (preflight), retornar OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit();
}

// =====================================================
// CONFIGURAÇÃO DOS DESTINATÁRIOS
// =====================================================
$destinatarios = [
    'geral@galerieclinic.com',
    'alpha.clientesleads@gmail.com'
];

$assunto = 'New Lead GALERIE CLINIC';

// =====================================================
// RECEBER DADOS DO FORMULÁRIO
// =====================================================
$nome         = isset($_POST['nome']) ? trim(strip_tags($_POST['nome'])) : '';
$email        = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$telefone     = isset($_POST['telefone']) ? trim(strip_tags($_POST['telefone'])) : '';
$procedimento = isset($_POST['procedimento']) ? trim(strip_tags($_POST['procedimento'])) : '';
$mensagem     = isset($_POST['mensagem']) ? trim(strip_tags($_POST['mensagem'])) : '';

// =====================================================
// VALIDAÇÃO
// =====================================================
if (empty($nome) || empty($email) || empty($telefone)) {
    echo json_encode([
        'success' => false,
        'message' => 'Por favor, preencha todos os campos obrigatórios.'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'E-mail inválido.'
    ]);
    exit();
}

// =====================================================
// MAPEAR PROCEDIMENTO
// =====================================================
$procedimentosMap = [
    'toxina'           => 'Toxina Botulínica',
    'labial'           => 'Hidratação Labial',
    'bioestimuladores' => 'Bioestimuladores',
    'outros'           => 'Outros Tratamentos',
];

$procedimentoLabel = isset($procedimentosMap[$procedimento]) 
    ? $procedimentosMap[$procedimento] 
    : ($procedimento ?: 'Não especificado');

// =====================================================
// MONTAR O CORPO DO E-MAIL (HTML)
// =====================================================
$dataHora = date('d/m/Y H:i:s');

$corpoHTML = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f0ec; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #824A2F; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 500; }
        .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 13px; letter-spacing: 1px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f0ebe6; }
        .field:last-child { border-bottom: none; margin-bottom: 0; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #824A2F; font-weight: 600; margin-bottom: 6px; }
        .value { font-size: 16px; color: #333333; line-height: 1.5; }
        .message-box { background: #fcf9f5; border-radius: 12px; padding: 16px; margin-top: 6px; }
        .footer { background: #f8f5f2; padding: 20px 30px; text-align: center; font-size: 12px; color: #999; }
        .badge { display: inline-block; background: #f3e4d5; color: #824A2F; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>GALERIE CLINIC</h1>
            <p>NOVO LEAD RECEBIDO</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nome</div>
                <div class='value'>" . htmlspecialchars($nome) . "</div>
            </div>
            <div class='field'>
                <div class='label'>E-mail</div>
                <div class='value'><a href='mailto:" . htmlspecialchars($email) . "' style='color:#824A2F;'>" . htmlspecialchars($email) . "</a></div>
            </div>
            <div class='field'>
                <div class='label'>Telemóvel / Contacto</div>
                <div class='value'>" . htmlspecialchars($telefone) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Procedimento de Interesse</div>
                <div class='value'><span class='badge'>" . htmlspecialchars($procedimentoLabel) . "</span></div>
            </div>
            <div class='field'>
                <div class='label'>Mensagem</div>
                <div class='message-box'>
                    <div class='value'>" . nl2br(htmlspecialchars($mensagem)) . "</div>
                </div>
            </div>
        </div>
        <div class='footer'>
            Lead recebido em {$dataHora} &bull; Landing Page Galerie Clinic<br>
            Desenvolvido por <a href='https://marketingalphadigital.com.br/' style='color:#824A2F;'>Alpha Marketing Digital</a>
        </div>
    </div>
</body>
</html>
";

// =====================================================
// ENVIAR E-MAIL
// =====================================================
$to = implode(', ', $destinatarios);

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Galerie Clinic <noreply@galerieclinic.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$enviado = mail($to, $assunto, $corpoHTML, $headers);

if ($enviado) {
    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Não foi possível enviar o e-mail. Por favor, tente novamente mais tarde.'
    ]);
}
?>
