
package com.ERP.FinalProject;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j  // 로그를 사용할 수 있게 해줍니다.
@Controller
public class ProductionController {

    @GetMapping("/productionPage/production.html")
    public String productionPage() {
        return "fragments/production.html"; 
    }
    @GetMapping("/productionPage1/production8.html")
    public String productionPage1() {
        return "fragments/production8.html"; 
    }
    @GetMapping("/productionPage2/production5.html")
    public String productionPage2() {
        return "fragments/production5.html"; 
    }
    @GetMapping("/productionPage3/production7.html")
    public String productionPage3() {
        return "fragments/production7.html"; 
    }
    @GetMapping("/productionPage4/production9.html")
    public String productionPage4() {
        return "fragments/production9.html"; 
    }
   
}
