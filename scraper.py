# Importando bibliotecas utilizadas
import requests
from time import sleep
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
import pandas as pd
# import json


# Configurando o navegador
opcoes_navegador = Options()
# opcoes_navegador.add_argument('--headless')
opcoes_navegador.add_argument('window-size=400,800')


# Url do sigaa
url = 'https://sigaa.unb.br/sigaa/public/turmas/listar.jsf'


# Pegando dados do site
resposta = requests.get(url)
site = BeautifulSoup(resposta.content, 'html.parser')


# Encontrando departamentos no dropdown de ""Unidade""
lista_departamentos = ['FACULDADE DO GAMA - BRASÍLIA']

# Criando lista dos departamentos possiveis
# for departamento in dropdown_departamentos:
#     if departamento != '\n':
#         lista_departamentos.append(departamento.text)


# Usando selenium para abrir o navegador
navegador = webdriver.Firefox() # ! Solução do erro vem aqui
navegador.get(url)


# Inicializando variaveis
pre_dataframe = []


# Faz uma repetição pra cada departamento pegando a tabela e processando para cada departamento
for departamento in lista_departamentos:
    print(departamento)

    ano_letivo_input =  navegador.find_element(By.ID,'formTurma:inputAno')
    ano_letivo_input.clear()
    sleep(0.5)
    ano_letivo_input.send_keys('2024')
    sleep(0.5)

    semestre_input = navegador.find_element(By.ID, 'formTurma:inputPeriodo')
    semestre_input.send_keys('1')
    sleep(0.5)

    # Usando selenium para abrir a lista de departamentos e selecionando 1
    elemento_dropdown = navegador.find_element(By.ID, 'formTurma:inputDepto') # Encontra dropdown

    elemento_dropdown.send_keys(departamento)
    sleep(0.5)


    # Usando selenium para apertar o botao de buscar
    elemento_buscar = navegador.find_element(By.NAME, 'formTurma:j_id_jsp_1370969402_11') # Encontra botao # TODO verificar se esse parametro feiao nao vai causar probelmas por ser aparentemente gerado automaticamente por JS
    elemento_buscar.click()
    sleep(1)


    # Agora que abrimos a pagina correta com um dos departamentos pegamos a tabela com dados referentes
    pagina_certa = BeautifulSoup(navegador.page_source, 'html.parser')
    tabela_turmas = pagina_certa.find('table', attrs = {'class': 'listagem'})


    # Caso o departamento nao ofereça nenhuma materia ele pula para o proximo loop
    if tabela_turmas == None:
        continue


    # Pegando uma lista com as linhas da tabela e removendo as inuteis
    linhas_tabela = tabela_turmas.find_all('tr')
    linhas_tabela.pop(0)
    linhas_tabela.pop(-1)


    # Inicializando variaveis
    # pre_dataframe = [] #! VER SE EU POSSO DELETAR ISSO JA QUE ESTOU INICIALIZANDO A VARIAVEL LA EM CIMA AGR
    codigo_do_componente = ''
    nome_do_componente = ''
    link_do_componente = '' # TODO: fazer depois ja que vai dar uma trabalheira conseguir o link ja que ele esta sendo gerado automaticamente por javascript


    # Onde a porca torce o rabo, a vaca vai pro brejo e a coisa fica complicada
    for linha in linhas_tabela:
        
        # Pega as informacoes (codigo, nome e link) de cada Grupo/componente (as linhas azul no meio da tabela) e faz ele se repetir pra cada linha
        if linha.find('span', attrs = {'class': 'tituloDisciplina'})!= None:
            grupo = linha.find('span', attrs = {'class': 'tituloDisciplina'}).text
            codigo_do_componente, nome_do_componente = grupo.split(' - ', 1)
            # link_do_componente = linha.find('a', attrs = {'colspan': '8'})
            # print(linha.find('a', attrs = {'title': 'Visualizar Detalhes do Componente Curricular'}))
            # print('--------------------------------------------------')
            # TODO da linha 87
            continue
        
        # Inicializando variaveis e limpando depois de cada loop
        local_da_aula = ''
        docente = ''
        horario = ''
        carga_horaria = ''
        tamanho_da_turma = ''
        codigo_horario = ''
        
        # Pegando informacoes sobre o nome do docente e a carga horaria de determinada turma
        linha_docente_carga_horaria = linha.find('td', attrs = {'class': 'nome'})
        if linha_docente_carga_horaria:
            docente_hora = linha_docente_carga_horaria.text
            try:
                docente, carga_horaria = docente_hora.split(' (', 1)
                carga_horaria = carga_horaria.replace(')', '')
            except:
                docente = 'A DEFINIR DOCENTE'
                carga_horaria = 'A DEFINIR'
                print(docente_hora)
        
        # Pegando informacoes sobre o horario da aula de determinada turma
        if linha.find('div', attrs = {'class': 'popUp'}):
            horario = ((linha.find('div', attrs = {'class': 'popUp'})).text)
            horario = horario.replace('\n','')
            horario = horario.replace('\t','')
            # TODO separar os horarios quando tem mais de 1 dia
        
        # Pegando informacoes sobre o local da aula de determinada turma
        if linha.find('td', attrs = {'nowrap': 'nowrap'}):
            local_da_aula = (linha.find('td', attrs = {'nowrap': 'nowrap'}).text)
        
        # Pegando informacoes sobre o quantas vagas tem determinada turma
        if linha.find('td', attrs = {'style': 'text-align: center;'}):
            tamanho_da_turma = (linha.find('td', attrs = {'style': 'text-align: center;'}).text)


        if linha.find_all('td'):
            codigo_horario = linha.find_all('td')[3].text
            codigo_horario = codigo_horario.splitlines()[0]
            codigo_horario = codigo_horario.replace(" ", "")
            codigo_do_componente = codigo_do_componente + codigo_horario

        # Cria lista com todas as variveis na ordem que entrarao no dataframe
        pre_dataframe.append([codigo_do_componente, nome_do_componente, link_do_componente, docente, horario, local_da_aula, carga_horaria, tamanho_da_turma, codigo_horario])
    

# Criando dataframe
cabecalho_dataframe = ['id', 'name', 'link', 'teacher', 'time', 'place', 'workload', 'classSize', 'timeCode']
tabelinha = pd.DataFrame(pre_dataframe, columns = cabecalho_dataframe)


# Salvando dataframe
tabelinha.to_json('/frontend/data/turma1.json', orient="records", indent=4)

navegador.close()