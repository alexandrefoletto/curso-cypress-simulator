describe("Cypress Simulator", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true", {     //Abre a URL da aplicação ,skipa o Captcha e skipa o banner de consentimento de cookies
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted")
      }
    })
    cy.clearLocalStorage()    //Limpa o Local Storage antes de cada teste
    cy.injectAxe()
  })

  it("verifica o título da aplicação", () => {

  })

  it("verifica o texto do crédito no rodapé", () => {
    
  })

  it("verifica correto direcionamento do link Blog em uma nova aba", () => {
    
  })

  it("verifica correto direcionamento do link YouTube em uma nova aba", () => {
    
  })

  it("verifica correto direcionamento do link Podcast em uma nova aba", () => {
    
  })

  it("verifica correto direcionamento do link Udemy", () => {
    
  })

  it("verifica se login é efetuado com sucesso ao clicar no botão", () => {
    
  })

  it("verifica se a sessão de login persiste por 30 dias, exceto de usuário efetuar logoff", () => {
    
  })

  it("verifica se usuário pode efetuar logout com sucesso pelo menu sanduíche no cabeçalho", () => {
    cy.get("#sandwich-menu").click()
    cy.contains("button","Logout").click()
    // cy.get("#logoutButton").click()

    cy.contains("button", "Login").should("be.visible")
    cy.get("#sandwich-menu").should("not.be.visible")
  })

  it("verifica título da aplicação no cabeçalho", () => {
    
  })

  it("verifica texto do parágrafo no cabeçalho da aplicação", () => {
    
  })

  it("verifica a existência de menu sanduíche no cabeçalho contendo a opção de logout", () => {
    
  })

  it("verifica o show and hide do botão de logout", () => {
    cy.get("#sandwich-menu").click()
    
    cy.contains("button","Logout").should("be.visible")

    cy.get("#sandwich-menu").click()

    cy.contains("button","Logout").should("not.be.visible")

  })

  it("verifica quadro contendo comandos úteis do Cypress com descrições", () => {
    
  })

  it("verifica quadro contendo uma área de entrada de código para escrever comandos do Cypress", () => {
    
  })

  it("verifica estados enabled/disabled do botão de execução dos comandos (Run button)", () => {
    // cy.get("textarea[placeholder='Write your Cypress code here...']")
    //   .should("have.value", "")      //Não precisa dessa verificação inicial
    
    cy.contains("button", "Run").should("be.disabled")
        
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    
    cy.contains("button", "Run")
      .should("be.enabled")
      //.click()    não precisa clicar no botão

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .clear()
    
    cy.contains("button", "Run").should("be.disabled")
  })

  it("verifica estado disabled do botão de execução dos comandos (Run button) quando efetuado logout e login", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.get("#sandwich-menu").click()
    cy.contains("button","Logout").click()
    cy.contains("button", "Login").click()

    cy.contains("button", "Run").should("be.disabled")
    
    
  })

  it("verifica quadro dedicado para a saída da execução dos comandos (output)", () => {
    
  })

  it("verifica limpeza do quadro de saída (output) quando efetuado logout e login ", () => {
    cy.run("cy.log('Yay!')")
    
    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")

    cy.get("#sandwich-menu").click()
    cy.contains("button","Logout").click()
    cy.contains("button", "Login").click()
    
    cy.get("#outputArea")
      //.should("have.value", "")
      .should("not.contain", "cy.log('Yay!')")   //nova forma de verificação
  })

  it("verifica limpeza da textarea (conde input) quando efetuado logout e login ", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('Yay!')")
    cy.get("#sandwich-menu").click()
    cy.contains("button","Logout").click()
    cy.contains("button", "Login").click()

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .should("have.value", "") 
    
  })
  
  it("verifica se é possível maximizar e minimizar (maximize/minimize) quadro de saída", () => {
    cy.run("cy.log('Yay!')")

    cy.get(".expand-collapse", { timeout: 10000 })
      .click()
       
    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
 
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

  it("verifica o Running ... state na execução dos comandos antes do resultado final ser exibido", () => {
    cy.run("cy.log('Yay!')")

    cy.contains("button", "Running...")
      .should("be.disabled")
      .and("be.visible")
    cy.contains("#outputArea", "Running... Please wait.")
      .should("be.visible")
    
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

  it("verifica fornecimento imediado de feedback na execução dos comandos", () => {
    
  })

  it("verifica mensagem success na execução dos comandos - Exemplo: cy.log('Yay!')", () => {
    //cy.get("#codeInput")
    cy.run("cy.log('Yay!')")

    //cy.get(".success", { timeout: 10000 })
    cy.get("#outputArea", { timeout: 10000 })
      //.should("be.visible")
      .should("contain", "Success:")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible")
  })

  it("verifica mensagem de erro: error: invalid cypress command, na execução dos comandos - Exemplo: cy.run()", () => {
    cy.run("cy.run()")

    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Invalid Cypress command: cy.run()")
      .and("be.visible")
    
  })

  it("verifica mensagem de erro: error: valid command without parentheses na execução dos comandos - Exemplo: cy.visit", () => {
    cy.run("cy.visit")

    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Error:")
      .and("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
    
  })

  it("verifica mensagem warning quando ainda não foi emplementada a simulação de um comando existente na execução dos comandos - Ex: cy.contains('Login') ", () => {
    cy.run("cy.contains('Login')")

    cy.get("#outputArea", { timeout: 10000 })
      .should("contain", "Warning:")
      .and("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
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
    
  })

})

describe("Cypress Simulator - Cookies consent", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.clearLocalStorage()    //Limpa todo o Local Storage antes de cada teste
    cy.injectAxe()
  })
  
  it("verifica se banner de consentimento de coockies é exibido somente para novos usuários", () => {
    
  })

  it("verifica se banner de consentimento possui explicação do uso de cookies", () => {
    
  })

  it("verifica se banner de consentimento não aparece na página de login", () => {
    cy.clearAllLocalStorage()
    cy.reload()

    cy.contains("button", "Login").should("be.visible")

    cy.get("#cookieConsent")
      .should("not.be.visible")
    
  })

  it("verifica se banner de consentimento possui botões Aceitar e Recusar", () => {
    
  })

  it("verifica se botão Aceitar (Accept) do banner de consentimento está definindo a chamada cookieConsent com o valor accepted", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Accept')")
      .click()

    cy.get("@cookieConsentBanner").should("not.be.visible")
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted")
  })

  it("verifica se botão Recusar (Decline) do banner de consentimento está definindo a chamada cookieConsent com o valor declined", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Decline')")
      .click()

    cy.get("@cookieConsentBanner").should("not.be.visible")
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "declined")
    
  })
})

describe("Cypress Simulator - Captcha", () => {
  beforeEach(() => {
    cy.clearLocalStorage()    //Limpa o Local Storage antes de cada teste
    cy.visit("./src/index.html")
    cy.injectAxe()
    cy.contains("button", "Login").click()
  })
  it("verifica os estados do botão de captcha: desabilita o botão Verify quando nenhuma resposta for indicada ou quando a resposta for limpa", () => {
    //cy.get('#captchaInput')
    cy.get("input[placeholder='Enter your answer']")
      .should("be.empty")
    
    cy.contains("button", "Verify").should("be.disabled")

    //cy.get('#captchaInput')
    cy.get("input[placeholder='Enter your answer']")
      .type("1234")
      .and("have.value", "1234")
    
    cy.contains("button", "Verify").should("be.enabled")

    //cy.get('#captchaInput')
    cy.get("input[placeholder='Enter your answer']")
      .clear()
      .should("be.empty")

    cy.contains("button", "Verify").should("be.disabled")


  })

  it("verifica erro na resolução do captcha onde uma resposta errada retorna ao estado inicial do captcha", () => {
    cy.get("input[placeholder='Enter your answer']")
      .type("1234")
      .and("have.value", "1234")
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
    
  })

  it("verifica várias tentativas ao fornecer resposta incorrecta no capcha", () => {
    
  })
})