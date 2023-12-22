# Projeto de Montagem das Grades Horárias da Universidade de Brasília - Campus FGA

<p align="center">
  <img src="frontend/public/gama.png" alt="Prompts" width="300" style="border-radius: 20px;"/>
</p>

## Visão Geral do Projeto 🔎

O projeto de Montagem das Grades Horárias da Universidade de Brasília (UnB) no Campus FGA (Faculdade UnB Gama) é uma iniciativa de código aberto que visa automatizar e facilitar o processo de criação e organização das grades horárias para os cursos oferecidos no Campus FGA. Através desse projeto, pretende-se otimizar a alocação de disciplinas, professores e salas de aula, buscando melhorar a experiência acadêmica dos estudantes e a eficiência dos processos administrativos.

## Funcionalidades ⚙️

1. **Importação de Dados**: O sistema permite importar dados relevantes, como a lista de disciplinas oferecidas no semestre, informações dos professores, recursos das salas de aula e restrições de horário.

2. **Interface Amigável**: O sistema possui uma interface intuitiva e amigável, permitindo que os coordenadores dos cursos e a equipe administrativa possam interagir facilmente com o projeto, visualizando e ajustando as grades horárias conforme necessário.

## Tecnologias Utilizadas 🚀

O projeto faz uso de tecnologias modernas e ferramentas de desenvolvimento de ponta para garantir sua eficiência e escalabilidade. As principais tecnologias utilizadas são:

- Linguagem de programação: Python e Typescript
- Framework de desenvolvimento web: React.js
- Importação de dados: Beatifulsoup

## Como rodar ao clonar 🤔

1. Apos clonar o projeto, rode o script de scraping

```
    python scraper.py
```
2. O script irá gerar um arquivo `turmas.json`, transfira este arquivo para o frontend desta forma:

```
    frontend/data/turmas.json
```

3. Rode o comando na raiz da pasta `frontend`

```
    yarn dev
```

## Como Contribuir 📖

O projeto é de código aberto e aceita contribuições da comunidade para seu aprimoramento contínuo. Se você deseja contribuir, siga os passos abaixo:

1. Faça um fork do repositório para a sua conta do GitHub.
2. Crie uma branch para trabalhar nas suas modificações.
3. Implemente as melhorias ou correções desejadas.
4. Faça um pull request para enviar suas alterações e aguarde a revisão dos mantenedores.

## Aviso Legal

Este projeto é mantido por voluntários e não possui nenhum vínculo oficial com a Universidade de Brasília ou a Faculdade UnB Gama. O uso deste projeto é por conta e risco do usuário, e os mantenedores não se responsabilizam por quaisquer danos ou prejuízos causados pelo seu uso.

## Contato

Para entrar em contato com os mantenedores do projeto ou relatar problemas, você pode abrir uma issue no repositório do GitHub.