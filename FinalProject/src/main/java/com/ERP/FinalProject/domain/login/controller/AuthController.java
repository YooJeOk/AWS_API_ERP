// AuthController.java
package controller;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.EmailService;
import service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    private final Map<String, String> verificationCodes = new HashMap<>();

    // 이메일로 인증 코드 전송
    @PostMapping("/sendVerificationCode")
    public String sendVerificationCode(@RequestParam String email) {
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return "사용자를 찾을 수 없습니다.";
        }

        String verificationCode = String.format("%06d", new Random().nextInt(1000000));
        verificationCodes.put(email, verificationCode);
        emailService.sendVerificationEmail(email, verificationCode);

        return "인증 코드가 전송되었습니다.";
    }

    // 인증 코드 확인 및 비밀번호 변경
    @PostMapping("/verifyCodeAndResetPassword")
    public String verifyCodeAndResetPassword(@RequestParam String email, 
                                             @RequestParam String code, 
                                             @RequestParam String newPassword) {
        String storedCode = verificationCodes.get(email);

        if (storedCode == null || !storedCode.equals(code)) {
            return "인증 코드가 올바르지 않습니다.";
        }

        User user = userService.findUserByEmail(email);
        if (user == null) {
            return "사용자를 찾을 수 없습니다.";
        }

        userService.updatePassword(user, newPassword);
        verificationCodes.remove(email);

        return "비밀번호가 성공적으로 변경되었습니다.";
    }
}
