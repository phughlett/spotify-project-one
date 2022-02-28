describe("Login page", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  it("login button should exist", () => {
    cy.contains('Login to Spotify')
  })
})

const login = () => {
  const CLIENTID = "ac38f5f06516492a855d792e3a73b558"
  const SECRETID = "b95685fa74f943368ce4b2206c6d8bad"
  const authHeader = 'Basic ' + (new Buffer(CLIENTID + ':' + SECRETID).toString('base64'))

  const options = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    form: true,
    body: {
      grant_type: "client_credentials"
    },
    headers: {
      Authorization: authHeader
    }
  };

  cy.request(options).then(resp => {
    localStorage.setItem("token", resp.body.access_token);
  });
}

describe("Search test suite", () => {
  beforeEach(() => {
    login();
})
  it("homepage exists", () => {
    cy.visit("http://localhost:3000/homepage");
    
  });
  it("searchbar exists", () => {
    cy.visit("http://localhost:3000/homepage");
    
  });
});