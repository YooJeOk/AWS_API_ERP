package com.ERP.FinalProject;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j  // 로그를 사용할 수 있게 해줍니다.
@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        log.info("Home page accessed.");  // 로그 출력
        return "index";  // index.html 파일을 반환
    }
}
