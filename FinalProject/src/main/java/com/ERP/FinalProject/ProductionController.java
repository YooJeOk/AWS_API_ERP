
package com.ERP.FinalProject;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j  // 로그를 사용할 수 있게 해줍니다.
@Controller
public class ProductionController {

    @GetMapping("/production")
    public String productionPage() {
        return "fragments/production"; 
    }
}
