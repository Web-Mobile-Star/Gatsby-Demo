const base64ImageExp = /data:image\/(jpeg|png|gif);base64,[a-zA-Z0-9/+]+=*/g

// The base64 data of image previews might change over time
// when Contentful adjusts their Image API
function testWithBase64(elem) {
  elem.invoke("prop", "outerHTML").then(html => {
    // Check if we have a valid base64 data
    expect(html).to.match(base64ImageExp)

    // Remove all base64 data
    const cleanHtml = html.replace(
      base64ImageExp,
      `data:image/redacted;base64,redacted`
    )

    // Create a DOM element with the redacted base64 data
    cy.document().then(document => {
      var temp = document.createElement("div")
      temp.innerHTML = cleanHtml
      cy.wrap(temp.firstChild).snapshot()
    })
  })
}

describe(`rich-text`, () => {
  beforeEach(() => {
    cy.visit("/rich-text").waitForRouteChange()
  })
  it(`rich-text: All Features`, () => {
    cy.get(`[data-cy-id="rich-text-all-features"]`).scrollIntoView({
      duration: 500,
    })
    cy.wait(1000)
    testWithBase64(cy.get(`[data-cy-id="rich-text-all-features"]`))
  })
  it(`rich-text: Basic`, () => {
    cy.get(`[data-cy-id="rich-text-basic"]`).snapshot()
  })
  it(`rich-text: Embedded Entry`, () => {
    cy.get(`[data-cy-id="rich-text-embedded-entry"]`).snapshot()
  })
  it(`rich-text: Embedded Asset`, () => {
    cy.get(`[data-cy-id="rich-text-embedded-asset"]`).scrollIntoView({
      duration: 500,
    })
    cy.wait(1000)
    testWithBase64(cy.get(`[data-cy-id="rich-text-embedded-asset"]`))
  })
  it(`rich-text: Embedded Entry With Deep Reference Loop`, () => {
    cy.get(
      `[data-cy-id="rich-text-embedded-entry-with-deep-reference-loop"]`
    ).snapshot()
  })
  it(`rich-text: Embedded Entry With Reference Loop`, () => {
    cy.get(
      `[data-cy-id="rich-text-embedded-entry-with-reference-loop"]`
    ).snapshot()
  })
  it(`rich-text: Inline Entry`, () => {
    cy.get(`[data-cy-id="rich-text-inline-entry"]`).snapshot()
  })
  it(`rich-text: Inline Entry With Deep Reference Loop`, () => {
    cy.get(
      `[data-cy-id="rich-text-inline-entry-with-deep-reference-loop"]`
    ).snapshot()
  })
  it(`rich-text: Inline Entry With Reference Loop`, () => {
    cy.get(
      `[data-cy-id="rich-text-inline-entry-with-reference-loop"]`
    ).snapshot()
  })
  it(`rich-text: Localized`, () => {
    cy.get(`[data-cy-id="english-rich-text-localized"]`).snapshot()
    cy.get(`[data-cy-id="german-rich-text-localized"]`).snapshot()
  })
  it(`rich-text: Tables`, () => {
    cy.get(`[data-cy-id="rich-text-tables"]`).snapshot()
  })
})
