import request from 'supertest';
import app from './../src/app';
//import { Response } from 'express';

// Funcao describe, descreve o teste, e o segundo parametro eh uma funcao que executa o devido teste
describe('Testando rotas de accounts',  () => {
  it('POST /accounts/ - Deve retornar status 201', async () => { //metodo it eh o responsvael por definir as regras do teste
    const payload = { //Defino o payload (modelo que o teste deve atender)
      id: 1,
      name: 'Lucas',
      email: 'lucasrodrigues062@gmail.com',
      password: '123456'
    }
    const resultado = await request(app) // atribuo o resultado do envio de um post da variavel payload
        .post('/accounts/')
        .send(payload)

    expect(resultado.status).toEqual(201) // funcao expect, responsavel pela validacao do testa, aonde atribuo o valor e o que esperar dele
    expect(resultado.body.id).toBe(1) // Vefica se retornou o elemento cadastrado
  });

  it('POST /accounts/ - Deve retornar status 422', async () => { //metodo it eh o responsvael por definir as regras do teste
    const payload = { //Defino o payload (modelo que o teste deve atender)
      id: 1,
      endereco: 'Lucas',
      city: 'lucasrodrigues062@gmail.com',
      password: '123',
      
    }
    const resultado = await request(app) // atribuo o resultado do envio de um post da variavel payload
        .post('/accounts/')
        .send(payload)

    expect(resultado.status).toEqual(422); // funcao expect, responsavel pela validacao do testa, aonde atribuo o valor e o que esperar dele

  });

  it('PATCH /accounts/:id - Deve retornar status 200', async () => { //metodo it eh o responsvael por definir as regras do teste
    const payload = { //Defino o payload (modelo que o teste deve atender)
      name: 'Lucas Rodrigues',
      email: 'lucasrodrigues062@gmail.com',
      password: '123456789'
    }
    const resultado = await request(app) // atribuo o resultado do envio de um post da variavel payload
        .patch('/accounts/1')
        .send(payload)

    expect(resultado.status).toEqual(200); // funcao expect, responsavel pela validacao do testa, aonde atribuo o valor e o que esperar dele
    expect(resultado.body.id).toEqual(1);
  });

  it('PATCH /accounts/:id - Deve retornar status 400', async () => { //metodo it eh o responsvael por definir as regras do teste
    const payload = { //Defino o payload (modelo que o teste deve atender)
      name: 'Lucas Rodrigues',
      email: 'lucasrodrigues062@gmail.com',
      password: '123456789'
    }
    const resultado = await request(app) // atribuo o resultado do envio de um post da variavel payload
        .patch('/accounts/abc')
        .send(payload)

    expect(resultado.status).toEqual(400); // funcao expect, responsavel pela validacao do testa, aonde atribuo o valor e o que esperar dele

  });


  it('PATCH /accounts/:id - Deve retornar status 404', async () => { //metodo it eh o responsvael por definir as regras do teste
    const payload = { //Defino o payload (modelo que o teste deve atender)
      name: 'Lucas Rodrigues',
      email: 'lucasrodrigues062@gmail.com',
      password: '123456789'
    }
    const resultado = await request(app) // atribuo o resultado do envio de um post da variavel payload
        .patch('/accounts/-1')
        .send(payload)

    expect(resultado.status).toEqual(404); // funcao expect, responsavel pela validacao do testa, aonde atribuo o valor e o que esperar dele

  });


  it('GET /accounts/ - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
        .get('/accounts/')
    expect(resultado.status).toEqual(200); //Nesse teste nao preciso passar um payload, pois ele verifica a listagem
    expect(Array.isArray(resultado.body)).toBeTruthy(); // Verifica se o retorno e um array
  })

  it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
        .get('/accounts/1')
    expect(resultado.status).toEqual(200); //Nesse teste eu passo um parametro de requisicao que vem do payload, pois testo se o filtro funciona
    expect(resultado.body.id).toBe(1); // Verifica se o valor da variavel ID, esta correta
  })

  it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
    const resultado = await request(app)
        .get('/accounts/2')
    expect(resultado.status).toEqual(404); //Nesse teste verificamos o retorno da falha, caso o id seja um que nao existe
   
  })

  it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
    const resultado = await request(app)
        .get('/accounts/abc')
    expect(resultado.status).toEqual(400); //Nesse teste verificamos o retorno da falha, caso o request feito, tenha sido de maneira errada
   
  })


})