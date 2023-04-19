//@ts-nocheck
import cypress from "cypress"
// import useStateArray from '../../docs/hooks/useStateArray/local_useStateArray'

const HOOK_NAME = 'useStateArray'
const initialValue = '[1,2,3,4]'

const click = (title:string) => {
    cy.get(`#cypress-${title}`).click({force:true})
}

const expectValue = (title:string, value:any) => {
  cy.get(`#cypress-${title}`).should('have.value', value)
}

describe(`TEST: ${HOOK_NAME}`, () => {

  it(`LOAD PAGE |  docs/${HOOK_NAME}`, () => {

    cy.visit(`/docs/hooks/${HOOK_NAME}`)
    cy.contains(HOOK_NAME)
    cy.get('#demo').scrollIntoView()

    expectValue('initial-value', initialValue)

  })



  it(`USE | clear / reset`, () => {

    click('clear')
    click('reset')

    click('clear-1')
    expectValue('array', '[]')
    
    click('reset-1')
    expectValue('array', initialValue)

    click('clear-1')
    expectValue('array', '[]')

    click('clear')
    click('reset')

  })


  it(`USE | set`, () => {
    click('set')
    click('clear-1')
    expectValue('array', '[]')

    click('set-1')
    expectValue('array', '[]')

    click('set-2')
    expectValue('array', '[1,2,3]')

    click('set-3')
    expectValue('array', '[1,2,3,4,5,6]')

    click('set-4')
    expectValue('array', '["Hello","World"]')

    click('set-5')
    expectValue('array', '[{"text":"Hello"},{"text":"World"}]')
    
    click('set-6')
    expectValue('array', '[[1,2,3],[4,5,6]]')
    click('set')

  })


  it(`USE | push`, () => {
    click('push')
    click('clear-1')
    expectValue('array', '[]')

    click('push-1')
    expectValue('array', '["new"]')
    expectValue('return', '"1"')
    
    click('push-2')
    expectValue('array', '["new",1,2,3]')
    expectValue('return', '"4"')

    click('push-3')
    expectValue('array', '["new",1,2,3,[1,2,3]]')
    expectValue('return', '"5"')

    click('push-4')
    expectValue('array', '["new",1,2,3,[1,2,3],{"hello":"world"}]')
    expectValue('return', '"6"')
    click('push')

  })


  it(`USE | unshift`, () => {
    click('clear-1')
    expectValue('array', '[]')

    click('unshift-1')
    expectValue('array', '["new"]')
    expectValue('return', '"1"')

    click('unshift-2')
    expectValue('array', '[1,2,3,"new"]')
    expectValue('return', '"4"')

    click('unshift-3')
    expectValue('array', '[[1,2,3],1,2,3,"new"]')
    expectValue('return', '"5"')

    click('unshift-4')
    expectValue('array', '[{"hello":"world"},[1,2,3],1,2,3,"new"]')
    expectValue('return', '"6"')
    
  })


  it(`USE | pop`, () => {
    click('set-2')
    expectValue('array', '[1,2,3]')

    click('pop-1')
    expectValue('array', '[1,2]')
    expectValue('return', '"3"')

    click('pop-1')
    expectValue('array', '[1]')
    expectValue('return', '"2"')

    click('pop-1')
    expectValue('array', '[]')
    expectValue('return', '"1"')

  })



  it(`USE | shift`, () => {
    click('set-2')
    expectValue('array', '[1,2,3]')

    click('shift-1')
    expectValue('array', '[2,3]')
    expectValue('return', '"1"')

    click('shift-1')
    expectValue('array', '[3]')
    expectValue('return', '"2"')

    click('shift-1')
    expectValue('array', '[]')
    expectValue('return', '"3"')

  })


  it(`USE | filter`, () => {
    click('filter')

    click('set-2')
    click('push-1')
    expectValue('array', '[1,2,3,"new"]')

    click('filter-1')
    expectValue('array', '[1,2,3]')


    click('set-2')
    click('push-1')
    expectValue('array', '[1,2,3,"new"]')

    click('filter-2') 
    expectValue('array', '["new"]')


    click('set-2')
    click('push-1')
    expectValue('array', '[1,2,3,"new"]')

    click('filter-3')
    expectValue('array', '[3]')
    click('filter')

  })


  it(`USE | fill`, () => {
    const rst = () => {
      click('set-2')
      expectValue('array', '[1,2,3]')
    }
    click('fill')
    
    rst()
    click('fill-1')
    expectValue('array', '[1,6,3]')

    rst()
    click('fill-2')
    expectValue('array', '[1,7,7]')

    rst()
    click('fill-3')
    expectValue('array', '[8,8,8]')

    rst()
    click('fill-4')
    expectValue('array', '[1,9,3,0,0,0,0,0]')
    
    rst()
    click('fill-5')
    expectValue('array', '[10,10,10,10,10,10,10,10,10,10]')
    
    click('fill')
  })


  it(`USE | reverse`, () => {
    click('reverse')
    
    click('set-2')
    click('reverse-1')
    expectValue('array', '[3,2,1]')

    click('set-3')
    click('reverse-1')
    expectValue('array', '[6,5,4,1,2,3]') 


    click('set-4')
    click('reverse-1')
    expectValue('array', '["World","Hello"]') 

    click('set-5')
    click('reverse-1')
    expectValue('array', '[{"text":"World"},{"text":"Hello"}]') 
    
    click('set-6')
    click('reverse-1')
    expectValue('array', '[[4,5,6],[1,2,3]]') 
    
    click('reverse')
  })


  it(`USE | sort`, () => {
    const rst = () => {
      click('set-2')
    }

    click('sort')
    
    rst()
    click('sort-1')
    expectValue('array', '[3,2,1]')


    rst()
    click('sort-2')
    expectValue('array', '[1,2,3]')


    rst()
    click('sort-3')
    expectValue('array', '[3,2,1]')

    click('sort')


  })




})