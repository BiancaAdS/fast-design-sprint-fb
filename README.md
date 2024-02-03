# Fast Design Sprint

Aplicação web Fast Design Sprint implementada para o TCC:
**"Instanciação e Avaliação de modelo de agenda do Design Sprint para uso em um Hackathon"**.
Para a implementação da aplicação foi utilizado o Reactjs para o desenvolvimento do Frontend e o Django Framework para o desenvolvimento do Backend.

## Instalação

Antes de iniciar, você deve realizar o clone desse repositório (ou baixar o zip com o código-fonte):

`git clone https://github.com/BiancaAdS/fast-design-sprint-fb.git`

`cd fast-design-sprint-fb`

Após realizar o clone do repositório, crie um ambiente virtual e instale as dependências para a execução do projeto disponíveis no arquivo requirements.txt:

Com o pip, instale o virtualenv:

_pip install virtualenv_

Ao finalizar a instalação do virtualenv, dentro do diretório fast-design-sprint-fb, basta dar o comando:

_virtualenv venv_

O nome _venv_ é o nome de exemplo escolhido para o ambiente virtual, caso deseje pode ser escolhido outro nome para o ambiente.

Para realizar a ativação do ambiente virtual, execute o seguinte comando na pasta bin:

_source venv/bin/activate_

Com o ambiente virtual ativado, instale os requisitos para a execução da aplicação:

`pip install -r requirements.t`

Antes de iniciar a execução da aplicação, deve-se realizar algumas mudanças no arquivo _settings.py_.
Caminhe até o diretório fast_design_sprint e realize as seguintes edições no arquivo _setting.py_:

- Localize a seção _DEBUG_ e realize a troca de False para True:

  `DEBUG = True`

- Nesse mesmo diretório, crie o arquivo _.env_ e insira as informações da _DATABASES_ e _SECRET_KEY_:
  ```
  NAME=NomeDatabase
  USER=UsuarioDatabase
  PASSWORD=SenhaDatabase
  HOST=HostDatabase
  PORT=PortDatabase
  SECRET_KEY=SecretKey
  ```

Caso queira gerar uma SECRET_KEY, execute o seguinte comando: `python -c "import secrets; print(secrets.token_urlsafe())"`

#### Para o **Frontend:**

Caminhe até o diretório frontend: `cd \frontend` .
No diretório realize a instalação das dependências executando o seguinte comando:

`npm i` ou `npm install`

## Rodando localmente

Após realizar todas as instalações, se tudo estiver correto, você já pode rodar o servidor de desenvolvimento e testar a aplicação.
O seguinte comando deve ser executado no diretório que contém o arquivo _manage.py_:

`python manage.py runserver`

Após iniciar o servidor, você pode executar a aplicação em modo de desenvolvimento.
O seguinte comando deve ser executado no diretório _\frontend_:

`npm run dev `

Para acessar a aplicação acesse: `http://127.0.0.1:8000/`

Caso queira acessar o SWAGGER da aplicação ATIVIDADES e ETAPA acesse o link: [SWAGGER](https://fast-design-sprint.vercel.app/api-atividades/swagger/)

Caso queira acessar a aplicação Fast Design Sprint acesse o link: [FDS Aplicação](https://fast-design-sprint.vercel.app/)
