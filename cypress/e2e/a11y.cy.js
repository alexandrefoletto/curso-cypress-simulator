describe("Cypress Simulator - A11y Checks", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("./src/index.html?skipCaptcha=true&chancesOfError=0", {
        onBeforeLoad(win) {
          win.localStorage.setItem("cookieConsent", "accepted")
        }
      })
      cy.injectAxe()
    })

    it("verifica mensagem warning quando ainda não foi emplementada a simulação de um comando existente na execução dos comandos - Ex: cy.contains('Login') ", () => {
      cy.run("cy.contains('Login')")
    
      cy.get("#outputArea", { timeout: 10000 })
        .should("contain", "Warning:")
        .and("contain", "The `cy.contains` command has not been implemented yet.")
        .and("be.visible")

      cy.checkA11y(".warning")    //classe verificada através da visualização do elemento no console do navegador
    })
    
    
    it("verifica mensagem de erro: error: valid command without parentheses na execução dos comandos - Exemplo: cy.visit", () => {
    cy.run("cy.visit")
  
    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")

    cy.checkA11y(".error")    //classe verificada através da visualização do elemento no console do navegador
    })

    // Cypress._.times(100, () => {  
      
    // })
    it("verifica mensagem success na execução dos comandos - Exemplo: cy.log('Yay!')", () => {
      cy.run("cy.log('Yay!')")
    
      //cy.get(".success", { timeout: 10000 })
      cy.get("#outputArea", { timeout: 10000 })
        //.should("be.visible")
        .should("contain", "Success:")
        .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
        .and("be.visible")

      cy.checkA11y(".success")    
    })

    it("verifica mensagem de erro: error: invalid cypress command, na execução dos comandos - Exemplo: cy.run()", () => {
      cy.run("cy.run()")
    
      cy.get("#outputArea", { timeout: 10000 })
        .should("contain", "Error:")
        .and("contain", "Invalid Cypress command: cy.run()")
        .and("be.visible")

      cy.checkA11y(".error")    //classe verificada através da visualização do elemento no console do navegador
        
    })

    it("verifica mensagem warning quando ainda não foi emplementada a simulação de um comando existente na execução dos comandos - Ex: cy.contains('Login') ", () => {
      cy.run("cy.contains('Login')")
    
      cy.get("#outputArea", { timeout: 10000 })
        .should("contain", "Warning:")
        .and("contain", "The `cy.contains` command has not been implemented yet.")
        .and("be.visible")

      cy.checkA11y(".warning")    //classe verificada através da visualização do elemento no console do navegador
    })

    it("verifica se comando help exibe exemplos de uso do Cypress com um link para a documentação", () => {
      cy.run("help")
    
      cy.get("#outputArea", { timeout: 10000 })
        .should("contain", "Common Cypress commands and examples:")
        .and("contain", "For more commands and details, visit the official Cypress API documentation.")
        .and("be.visible")
      cy.contains("#outputArea a", "official Cypress API documentation")
        .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer")
        .and("be.visible")

      cy.checkA11y("#outputArea")
        
    })

    it("verifica se é possível maximizar e minimizar (maximize/minimize) quadro de saída", () => {
      cy.run("cy.log('Yay!')")
  
      cy.get(".expand-collapse", { timeout: 10000 })
        .click()
          
      cy.get("#outputArea", { timeout: 10000 })
        .should("contain", "Success:")
        .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
        .and("be.visible")
      
      cy.checkA11y()
    
      cy.get("#collapseIcon")
        .should("be.visible")
  
      cy.get(".expand-collapse", { timeout: 10000 })
        .click()
      cy.get("#expandIcon")
        .should("be.visible")
  
      // cy.get(".expand-collapse", { timeout: 10000 })
      //   .should("be.visible")
      //   .should("have.attr", "aria-expanded", "false")
      //   .and("be.visible")
      //   .click()
  
      // cy.get(".expand-collapse")
      //   .should("have.attr", "aria-expanded", "true")
      //   .and("be.visible")
    })

    it("verifica se usuário pode efetuar logout com sucesso pelo menu sanduíche no cabeçalho", () => {
        cy.get("#sandwich-menu").click()
        cy.contains("button","Logout").click()
        // cy.get("#logoutButton").click()
    
        cy.contains("button", "Login").should("be.visible")
        cy.get("#sandwich-menu").should("not.be.visible")

        cy.checkA11y()
    })
    
    it("verifica o show and hide do botão de logout", () => {
        cy.get("#sandwich-menu").click()
        
        cy.contains("button","Logout").should("be.visible")
        cy.checkA11y()
    
        cy.get("#sandwich-menu").click()
    
        cy.contains("button","Logout").should("not.be.visible")
    
    })

    it("verifica o Running ... state na execução dos comandos antes do resultado final ser exibido", () => {
      cy.run("cy.log('Yay!')")
  
      cy.contains("button", "Running...")
        .should("be.disabled")
        .and("be.visible")
      cy.contains("#outputArea", "Running... Please wait.")
        .should("be.visible")
      
      cy.checkA11y()
      
      cy.contains("button", "Running...", { timeout: 10000 })
        .should("not.exist")
      cy.contains("button", "Run")
        .should("be.visible")
      cy.contains("#outputArea", "Running... Please wait.", { timeout: 10000 })
        .should("not.exist")
      cy.get("#outputArea")
        .should("contain", "Success:")
        .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
        .and("be.visible")
      
      //cy.get("#outputArea")
      //  .should("contain", "Running... Please wait.")
        // .should("contain", "Success:")
        // .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      //  .and("be.visible")
        
    })
})

describe("Cypress Simulator - Cookies consent", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.clearLocalStorage()    //Limpa todo o Local Storage antes de cada teste
    cy.injectAxe()
    })
    
    it("verifica se botão Recusar (Decline) do banner de consentimento está definindo a chamada cookieConsent com o valor declined", () => {
      cy.get("#cookieConsent")
        .as("cookieConsentBanner")
        .should("be.visible")

      cy.checkA11y()

      cy.get("@cookieConsentBanner")
        .find("button:contains('Decline')")
        .click()
  
      cy.get("@cookieConsentBanner").should("not.be.visible")

      cy.window()
        .its("localStorage.cookieConsent")
        .should("be.equal", "declined")

      cy.checkA11y()
      
  })
})

describe("Cypress Simulator - Captcha", () => {
    beforeEach(() => {
      cy.clearLocalStorage()    //Limpa o Local Storage antes de cada teste
      cy.visit("./src/index.html")
      cy.contains("button", "Login").click()
      cy.injectAxe()
    })

    it("it finds no a11y issues on all captcha view states (button enabled/disabled and error)", () => {
      cy.get("input[placeholder='Enter your answer']")
        .type("1234")
        .and("have.value", "1234")
      
      cy.contains("button", "Verify").should("be.enabled")
      cy.checkA11y()
  
      cy.get("input[placeholder='Enter your answer']")
        .clear()
        .should("be.empty")
  
      cy.contains("button", "Verify").should("be.disabled")

      
      cy.get("input[placeholder='Enter your answer']")
        .should("be.empty")
        .type("1234")
        .should("have.value", "1234")
      cy.contains("button", "Verify").click()
      
      // cy.get("#captchaError")
      //   .should("be.visible")
      //   .and("have.text", "Incorrect answer, please try again.")
      
      cy.contains(".error", "Incorrect answer, please try again.")
        .should("be.visible")
  
      cy.get("input[placeholder='Enter your answer']")
        //.should("be.empty")       //Verifica se o input foi limpo
        .should("have.value", "")   //Verifica se o input foi limpo
      
      cy.contains("button", "Verify").should("be.disabled")
      
      cy.checkA11y()
    })
})