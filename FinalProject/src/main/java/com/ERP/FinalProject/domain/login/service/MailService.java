package service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    private String generatedCode;  // 이메일 전송 후 인증번호를 저장

    public String sendVerificationCode(String toEmail) {
        // 인증번호 생성
        generatedCode = generateVerificationCode();

        // 이메일 메시지 설정
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("비밀번호 찾기 인증 코드");
        message.setText("인증 코드: " + generatedCode);

        // 이메일 전송
        mailSender.send(message);

        return "이메일이 전송되었습니다.";
    }

    // 인증번호 생성 메서드
    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 6자리 난수 생성
        return String.valueOf(code);
    }

    // 인증번호 확인 메서드
    public boolean verifyCode(String code) {
        return generatedCode != null && generatedCode.equals(code);
    }
}
