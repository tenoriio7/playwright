# POC - PLAYWRIGHT                             



## Requisitos

<a href="https://nodejs.org/en/download/">NodeJS</a>

<a href="https://github.com/qawolf/playwright-video">playwright-video</a>

## Será necessário ter realizado o processo de configuração do FFmpeg para rodar o teste com captura de vídeo.

 [Documentação para instalação e configuração do FFmpeg](https://www.ffmpeg.org)  

 
 Variavel de ambiente :   `FFMPEG_PATH` 

## Realizar a execução dos testes sem video

Na pasta do projeto digite o comando:
```
"mocha test/mobile.js test/location_pagseguro.js --timeout 100000"
```


## Inicialmente devemos baixar as dependencias do projeto

Na pasta do projeto digite o comando:

```
npm install
```
## Realizar a execução de todos os testes

Na pasta do projeto digite o comando:
```
npm test
```


## Referências de estudo

* [Getting started](https://github.com/microsoft/playwright/blob/master/docs/intro.md)
* [Installation configuration](https://github.com/microsoft/playwright/blob/master/docs/installation.md)
* [API reference](https://github.com/microsoft/playwright/blob/master/docs/api.md)
