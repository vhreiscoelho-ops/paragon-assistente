/* gerado por montar.ps1 a partir de 01-conteudo/ferramenta/parametros-agua.json (Ana) — não edite à mão */
window.PARAGON_AGUA = {
  "versao": "2026-10-21",
  "status": "aguarda_validacao_ceo",
  "validado_ceo": false,
  "base_explicada_em": "base-conhecimento/parametros-agua.md",
  "rodape": "Conteúdo educativo, com fonte. Os números orientam; quem decide é o teste da sua água. Se os peixes mostrarem sinais de sofrimento, procure um veterinário de peixes ou uma loja especializada de confiança.",
  "proibido_na_tela": [
    "seguro",
    "garantido",
    "pode colocar os peixes",
    "nome de marca",
    "dose em gotas de produto",
    "remédio, sal, cloreto ou 'neutralizador'",
    "diagnóstico de doença"
  ],
  "regras_gerais": {
    "ordem_na_tela": ["vermelho", "amarelo", "info"],
    "cores": {
      "vermelho": "🔴",
      "amarelo": "🟡",
      "info": "ℹ️"
    },
    "um_alerta_por_parametro": "Por parâmetro, mostre só o alerta de pior cor. Alertas de 'variacao' e de 'faixa' do mesmo parâmetro podem aparecer juntos.",
    "precedencia_especie": "Se o aquário tem espécies cadastradas, os alertas com 'some_com_especie': true não aparecem; vale a faixa das espécies do especies.json (pH, temperatura, GH). Amônia, nitrito, nitrato, KH e variações continuam.",
    "ciclagem_sem_peixes": "Durante uma ciclagem sem peixes ativa, os alertas de amônia, nitrito e nitrato deste arquivo não aparecem (a amônia é posta de propósito). Quem fala é o ciclagem-regras.md.",
    "ciclagem_com_peixes": "Durante uma ciclagem com peixes ativa, o vermelho de amônia/nitrito é o do modo emergência do ciclagem-regras.md (mesmo texto); não repita o deste arquivo. O complemento de NH3 é o mesmo.",
    "medicao_vazia": "Parâmetro não medido = nenhum alerta para ele. Nunca trate vazio como zero.",
    "variacao": "Alertas de variação comparam com a medição anterior do mesmo parâmetro no mesmo aquário, só se a diferença de tempo for de até 'janela_dias'.",
    "contexto_com_peixes": "com_peixes = o aquário tem peixes cadastrados ou o usuário marcou 'tem peixes'. Sem essa informação, considere com_peixes = true (mais cauteloso).",
    "contextos": {
      "qualquer": "sempre",
      "com_peixes": "aquário com peixes e sem ciclagem com peixes ativa (nesse caso vale o modo emergência da ciclagem)",
      "sem_peixes_fora_da_ciclagem": "aquário sem peixes e sem ciclagem ativa",
      "qualquer_fora_da_ciclagem": "qualquer aquário que não esteja numa ciclagem sem peixes ativa",
      "sem_especie_cadastrada": "aquário com peixes, mas sem nenhuma espécie cadastrada"
    }
  },
  "unidades": {
    "ppm_igual_mg_l": true,
    "amonia": {
      "padrao": "mg_l_amonia_total",
      "opcoes": [
        { "id": "mg_l_amonia_total", "rotulo": "ppm ou mg/L (como o kit mostra)", "fator_para_padrao": 1.0 },
        { "id": "mg_l_N", "rotulo": "mg/L de N (o meu kit/laudo mede em N)", "fator_para_padrao": 1.22 }
      ],
      "nota": "Kits de aquário vendidos no Brasil medem amônia total (NH3 + NH4+) em ppm. Fator N -> NH3 = 1,22 (N -> NH4+ = 1,29). Como o alerta é 'acima de zero', a unidade só muda o número mostrado.",
      "fontes": ["PA12", "PA13", "F3"]
    },
    "nitrito": {
      "padrao": "mg_l_NO2",
      "opcoes": [
        { "id": "mg_l_NO2", "rotulo": "ppm ou mg/L (como o kit mostra)", "fator_para_padrao": 1.0 },
        { "id": "mg_l_N", "rotulo": "mg/L de N-NO2", "fator_para_padrao": 3.28 }
      ],
      "nota": "O Merck avisa que os kits podem informar só como nitrogênio do nitrito.",
      "fontes": ["F3", "PA13"]
    },
    "nitrato": {
      "padrao": "mg_l_NO3",
      "opcoes": [
        { "id": "mg_l_NO3", "rotulo": "ppm ou mg/L (como o kit mostra)", "fator_para_padrao": 1.0 },
        { "id": "mg_l_N", "rotulo": "mg/L de N-NO3", "fator_para_padrao": 4.43 }
      ],
      "nota": "É o parâmetro em que a unidade muda a decisão: 20 mg/L de N-NO3 são cerca de 89 mg/L de NO3. As referências do app são lidas como NO3 (mais conservador).",
      "fontes": ["F3", "PA13"]
    },
    "kh": {
      "padrao": "dKH",
      "opcoes": [
        { "id": "dKH", "rotulo": "°dKH (gotas do kit; a bula pode escrever °dH)", "fator_para_padrao": 1.0 },
        { "id": "mg_l_CaCO3", "rotulo": "ppm ou mg/L de CaCO3", "fator_para_padrao": 0.05602 },
        { "id": "meq_l", "rotulo": "meq/L", "fator_para_padrao": 2.801 }
      ],
      "nota": "1 °dKH = 17,85 mg/L de CaCO3; 1 meq/L = 50 mg/L de CaCO3.",
      "fontes": ["B23", "F2", "PA12"]
    },
    "gh": {
      "padrao": "dGH",
      "opcoes": [
        { "id": "dGH", "rotulo": "°dGH (pela tabela da bula)", "fator_para_padrao": 1.0 },
        { "id": "mg_l_CaCO3", "rotulo": "ppm ou mg/L de CaCO3", "fator_para_padrao": 0.05602 }
      ],
      "nota": "No GH, a conversão de gotas para °dGH vem da tabela da bula do kit. O app pede o valor já convertido.",
      "fontes": ["B23", "PA12"]
    },
    "ph": {
      "padrao": "ph",
      "opcoes": [{ "id": "ph", "rotulo": "pH", "fator_para_padrao": 1.0 }]
    },
    "temperatura": {
      "padrao": "C",
      "opcoes": [
        { "id": "C", "rotulo": "°C" },
        { "id": "F", "rotulo": "°F", "conversao": "C = (F - 32) / 1,8" }
      ]
    }
  },
  "precisao_kits": {
    "texto_ajuda": "O teste de gotas mostra um degrau da cartela de cores, não um número exato. Compare sempre do mesmo jeito, no mesmo horário e sob luz natural.",
    "zero": "Zero = a cor zero da cartela. Quer dizer 'abaixo da primeira cor depois do zero'.",
    "topo_da_cartela": {
      "campo_medicao": "no_topo_da_cartela",
      "pergunta": "A cor bateu na última cor da cartela?",
      "texto": "Quando a cor bate na última cor da cartela, o valor real pode ser maior. Para saber quanto, use um kit de faixa maior ou dilua a amostra em água sem o parâmetro e multiplique, como a bula indicar.",
      "regra": "Se marcado, trate o valor como 'pelo menos X' (>=) e mostre este texto."
    },
    "delta_minimo_tendencia": {
      "amonia": 0.25,
      "nitrito": 0.25,
      "nitrato": 5,
      "ph": 0.2,
      "kh": 1,
      "gh": 1,
      "temperatura": 0.5
    },
    "delta_minimo_texto": "Igual à medição anterior, dentro da precisão do teste.",
    "delta_minimo_base": "REGRA PRÁTICA (V10): aproximadamente um degrau de cartela ou uma gota. Não achamos estudo com a margem de erro dos kits de gota.",
    "kh_gotas": "1 gota = 1 °dKH com a amostra na marca 1; 1 gota = 0,5 °dKH com a amostra na marca 2 (mais precisa). Precisão de ± 1 gota.",
    "casas_decimais": "Nunca mostrar mais casas decimais do que o usuário digitou.",
    "fontes": ["PA12", "PA14", "CG3", "CG1"]
  },
  "constantes": {
    "NH3_ATENCAO": 0.02,
    "NH3_REFERENCIA": 0.05,
    "NH3_CRONICO": 0.20,
    "formula_NH3": "igual ao ciclagem-regras.md, seção 2: pKa = 0,09018 + 2729,92/(T + 273,15); f = 1/(10^(pKa - pH) + 1); NH3 = amonia_total x f",
    "TPA_ALERTA_MIN": 25,
    "TPA_ALERTA_MAX": 50,
    "RACAO_REDUZIDA_DIAS_MAX": 3,
    "NITRATO_REFERENCIA": 20,
    "NITRATO_ALTO": 50,
    "PH_EXTREMO_MIN": 5.0,
    "PH_EXTREMO_MAX": 9.0,
    "PH_GERAL_MIN": 6.5,
    "PH_VARIACAO": 1.0,
    "PH_VARIACAO_JANELA_DIAS": 7,
    "TEMP_GERAL_INFO_MIN": 22,
    "TEMP_GERAL_INFO_MAX": 28,
    "TEMP_QUENTE_INFO": 30,
    "TEMP_VARIACAO": 3,
    "TEMP_VARIACAO_JANELA_DIAS": 2,
    "KH_MUITO_BAIXO": 1.1,
    "KH_BAIXO": 2.8,
    "KH_QUEDA": 2,
    "KH_QUEDA_JANELA_DIAS": 14,
    "GH_MUITO_MOLE": 1.1
  },
  "parametros": [
    {
      "id": "amonia",
      "nome": "Amônia total",
      "unidade_tela": "mg/L",
      "faixa_referencia": { "texto": "0 (zero) em aquário com peixes", "min": 0, "max": 0 },
      "o_que_e": "O resíduo que os peixes soltam pelas brânquias, somado ao que vem da ração que sobra e da sujeira que apodrece. As bactérias do filtro transformam a amônia em nitrito.",
      "o_que_significa_subir": "O filtro não está dando conta: ração ou peixes demais, filtro novo, filtro lavado em água da torneira ou desligado, ou algo apodrecendo no aquário.",
      "o_que_significa_cair": "Cair até zero é o esperado. Com peixes, não existe amônia baixa demais.",
      "risco": "A parte tóxica é o NH3, e ela cresce com o pH e a temperatura. Com peixes, qualquer amônia acima de zero pede ação.",
      "caminho_seguro": [
        "Troque de 25 a 50% da água, com condicionador e na mesma temperatura.",
        "Reduza ou suspenda a ração por 1 a 3 dias.",
        "Confira se o filtro está ligado e se não foi lavado em água da torneira.",
        "Meça de novo amanhã."
      ],
      "alertas": [
        {
          "id": "amonia_acima_zero",
          "condicao": { "campo": "amonia", "op": ">", "valor": 0, "contexto": "com_peixes" },
          "cor": "vermelho",
          "titulo": "Amônia acima de zero",
          "texto": "Com peixes no aquário, a referência é amônia zero. A amônia é invisível e irrita as brânquias.",
          "acao": "Troque de 25 a 50% da água (com condicionador e na mesma temperatura) e reduza ou suspenda a ração por 1 a 3 dias. Confira o filtro e meça de novo amanhã.",
          "fonte_curta": "Manual Veterinário Merck: amônia de referência = 0. UF/IFAS: troca de 25 a 50% e menos ração por 1 a 3 dias.",
          "fontes": ["F3", "F1", "CG2"],
          "base": "FONTE (faixa e ação); a cor vermelha é REGRA PRÁTICA (V1)",
          "some_com_especie": false
        },
        {
          "id": "amonia_sem_peixes_info",
          "condicao": { "campo": "amonia", "op": ">", "valor": 0, "contexto": "sem_peixes_fora_da_ciclagem" },
          "cor": "info",
          "titulo": "Amônia na água",
          "texto": "Há amônia num aquário sem peixes. Se você está ciclando, use a ciclagem guiada; se não, descubra a origem antes de pôr peixes.",
          "acao": "Toque em 'Iniciei a ciclagem' se estiver ciclando.",
          "fonte_curta": "Manual Veterinário Merck: peixes só quando não houver amônia nem nitrito.",
          "fontes": ["F2"],
          "base": "FONTE",
          "some_com_especie": false
        }
      ],
      "complementos": [
        {
          "id": "nh3_calculado",
          "condicao": "amonia > 0 e ph e temperatura na mesma medição",
          "texto": "Com o seu pH e a sua temperatura, cerca de {NH3} mg/L dessa amônia está na forma tóxica (NH3).",
          "fontes": ["CG3", "CG4"]
        },
        {
          "id": "nh3_cronico",
          "condicao": "NH3 >= NH3_CRONICO",
          "texto": "Esse nível de amônia tóxica é o que a piscicultura associa a dano crônico aos peixes. Faça a troca parcial hoje.",
          "fontes": ["CG4", "CG3"]
        },
        {
          "id": "nh3_sem_dados",
          "condicao": "amonia > 0 e falta ph ou temperatura",
          "texto": "Informe o pH e a temperatura para ver quanto dessa amônia está na forma tóxica.",
          "fontes": []
        }
      ],
      "por_que": "Manual Veterinário Merck: amônia de referência = 0; os peixes de água doce costumam tolerar menos de 1 mg/L de amônia total, mas a tolerância varia por espécie. RSPCA Austrália: a amônia é tóxica a 0,1 ppm. Na mesma leitura do kit, a parte tóxica é cerca de 10 vezes maior em pH 8,0 do que em pH 7,0 (tabela da Embrapa).",
      "popular_x_fonte": [
        {
          "se_diz": "Amônia baixinha no kit não tem perigo.",
          "fonte_diz": "O kit mede a amônia total. A parte tóxica pesa mais em água alcalina e quente, e a RSPCA Austrália diz que a amônia é tóxica a 0,1 ppm.",
          "frase": "Com peixes, a amônia tem que ser zero. E o mesmo número pesa mais em água alcalina e quente.",
          "fontes": ["CG3", "CG4", "CG2"]
        },
        {
          "se_diz": "A água está cristalina, então está boa.",
          "fonte_diz": "Amônia e nitrito não se veem; a referência é zero, e só o teste mostra.",
          "frase": "Água transparente pode esconder amônia e nitrito. Os dois são invisíveis: só o teste mostra.",
          "fontes": ["F3", "F1"]
        }
      ]
    },
    {
      "id": "nitrito",
      "nome": "Nitrito",
      "unidade_tela": "mg/L",
      "faixa_referencia": { "texto": "0 (zero)", "min": 0, "max": 0 },
      "o_que_e": "A etapa do meio: as bactérias transformam a amônia em nitrito e o nitrito em nitrato.",
      "o_que_significa_subir": "O filtro ainda está se formando ou perdeu as bactérias que consomem nitrito (mesmas causas da amônia).",
      "o_que_significa_cair": "Cair até zero é o esperado.",
      "risco": "O nitrito atrapalha o sangue do peixe a levar oxigênio. A sensibilidade varia muito entre espécies.",
      "caminho_seguro": [
        "Troque de 25 a 50% da água, com condicionador e na mesma temperatura.",
        "Reduza ou suspenda a ração por 1 a 3 dias.",
        "Confira o filtro.",
        "Meça de novo amanhã."
      ],
      "alertas": [
        {
          "id": "nitrito_acima_zero",
          "condicao": { "campo": "nitrito", "op": ">", "valor": 0, "contexto": "com_peixes" },
          "cor": "vermelho",
          "titulo": "Nitrito acima de zero",
          "texto": "Com peixes no aquário, a referência é nitrito zero. Ele atrapalha o sangue do peixe a levar oxigênio.",
          "acao": "Troque de 25 a 50% da água (com condicionador e na mesma temperatura) e reduza ou suspenda a ração por 1 a 3 dias. Confira o filtro e meça de novo amanhã.",
          "fonte_curta": "Manual Veterinário Merck: nitrito de referência = 0. UF/IFAS: nocivo a partir de cerca de 0,1 mg/L.",
          "fontes": ["F3", "F1"],
          "base": "FONTE (faixa e ação); a cor vermelha é REGRA PRÁTICA (V2)",
          "some_com_especie": false
        },
        {
          "id": "nitrito_sem_peixes_info",
          "condicao": { "campo": "nitrito", "op": ">", "valor": 0, "contexto": "sem_peixes_fora_da_ciclagem" },
          "cor": "info",
          "titulo": "Nitrito na água",
          "texto": "Há nitrito num aquário sem peixes. Se você está ciclando, use a ciclagem guiada.",
          "acao": "Toque em 'Iniciei a ciclagem' se estiver ciclando.",
          "fonte_curta": "Manual Veterinário Merck: peixes só quando não houver amônia nem nitrito.",
          "fontes": ["F2"],
          "base": "FONTE",
          "some_com_especie": false
        }
      ],
      "por_que": "Manual Veterinário Merck: nitrito de referência = 0. UF/IFAS: nocivo a partir de cerca de 0,1 mg/L. Num estudo do INPA, metade dos cardinais morreu em 4 dias com 1,1 mg/L, e esse número não é limite seguro.",
      "popular_x_fonte": []
    },
    {
      "id": "nitrato",
      "nome": "Nitrato",
      "unidade_tela": "mg/L",
      "faixa_referencia": { "texto": "abaixo de 20 mg/L", "min": 0, "max": 20 },
      "o_que_e": "O produto final do ciclo. É bem menos tóxico que a amônia e o nitrito, mas se acumula. Sai com as trocas parciais e é consumido pelas plantas.",
      "o_que_significa_subir": "Trocas parciais poucas ou pequenas, ração demais, peixes demais ou poucas plantas. A água da torneira também pode trazer nitrato: meça a água nova.",
      "o_que_significa_cair": "Cair é bom. Nitrato zero com filtro formado pode ser efeito de muitas plantas ou de trocas grandes; não é problema em si.",
      "risco": "Em exposição longa, o nitrato alto afeta sobretudo ovos e larvas; nos adultos o efeito é menor. Não há limite próprio para peixes de aquário.",
      "caminho_seguro": [
        "Faça trocas parciais regulares (a RSPCA Austrália indica de 10 a 25% por semana).",
        "Reveja a quantidade de ração.",
        "Plantas ajudam a consumir o nitrato.",
        "Meça o nitrato da água da torneira."
      ],
      "alertas": [
        {
          "id": "nitrato_atencao",
          "condicao": { "campo": "nitrato", "op": "entre", "min": 20, "max_exclusivo": 50, "contexto": "qualquer_fora_da_ciclagem" },
          "cor": "amarelo",
          "titulo": "Nitrato acima da referência",
          "texto": "O nitrato está acima de 20 mg/L, a faixa de referência veterinária. Não é emergência, mas mostra que ele está se acumulando.",
          "acao": "Aumente as trocas parciais (a RSPCA Austrália indica de 10 a 25% por semana) e reveja a ração. Meça de novo depois da próxima troca.",
          "fonte_curta": "Manual Veterinário Merck: nitrato abaixo de 20 mg/L.",
          "fontes": ["F3", "CG2"],
          "base": "FONTE (20 mg/L); a cor é REGRA PRÁTICA (V3)",
          "some_com_especie": false
        },
        {
          "id": "nitrato_alto",
          "condicao": { "campo": "nitrato", "op": ">=", "valor": 50, "contexto": "qualquer_fora_da_ciclagem" },
          "cor": "vermelho",
          "titulo": "Nitrato alto",
          "texto": "O nitrato passou de 50 mg/L. Uma revisão científica aponta que, em exposição longa, cerca de 44 mg/L já podem afetar animais de água doce.",
          "acao": "Faça uma troca parcial nos próximos dias e repita até o nitrato ficar abaixo de 20 mg/L. Depois, mantenha trocas regulares e reveja a ração.",
          "fonte_curta": "Manual Veterinário Merck: abaixo de 20 mg/L. Camargo e colegas (2005, revisão científica): 10 mg/L de nitrogênio do nitrato (cerca de 44 mg/L de nitrato) já pode afetar animais de água doce em exposição longa.",
          "fontes": ["F3", "PA7", "PA8"],
          "base": "FONTE (20 e ~44 mg/L); o corte em 50 e a cor são REGRA PRÁTICA (V3)",
          "some_com_especie": false
        }
      ],
      "por_que": "Manual Veterinário Merck: nitrato abaixo de 20 mg/L. Revisão de Camargo e colegas (2005): cerca de 44 mg/L de nitrato pode afetar animais de água doce em exposição longa. O nitrato aparecendo é sinal de que o filtro funciona; o problema é acumular.",
      "popular_x_fonte": [
        {
          "se_diz": "Nitrato não faz mal. / Nitrato tem que ser zero.",
          "fonte_diz": "É bem menos tóxico, mas se acumula: a referência veterinária é abaixo de 20 mg/L. Nitrato presente é sinal de filtro funcionando.",
          "frase": "Nitrato não precisa ser zero, mas não pode acumular. A referência veterinária é abaixo de 20 mg/L.",
          "fontes": ["F3", "PA7", "CG2"]
        }
      ]
    },
    {
      "id": "ph",
      "nome": "pH",
      "unidade_tela": "",
      "faixa_referencia": { "texto": "6,5 a 9,0 em geral; vale a faixa das suas espécies", "min": 6.5, "max": 9.0 },
      "o_que_e": "A acidez da água, de 0 a 14 (7 é neutro).",
      "o_que_significa_subir": "Água de reposição mais alcalina, rochas ou substrato calcário. Com pH alto, a amônia fica mais tóxica.",
      "o_que_significa_cair": "Geralmente o KH (a reserva) acabou: as bactérias do filtro e a sujeira consomem o KH. Madeira e turfa também baixam o pH.",
      "risco": "A mudança brusca pesa mais que o número. Uma queda rápida de pH pode matar os peixes.",
      "caminho_seguro": [
        "Meça o KH: pH caindo com KH baixo é o sinal clássico de risco.",
        "Não corrija o pH com produto: mudanças rápidas são mais arriscadas que o número.",
        "Faça trocas parciais com água tratada, na mesma temperatura e de química parecida com a do aquário.",
        "Escolha espécies que combinem com a água que você tem."
      ],
      "alertas": [
        {
          "id": "ph_extremo",
          "condicao": { "campo": "ph", "op": "fora", "min": 5.0, "max": 9.0, "contexto": "com_peixes" },
          "cor": "amarelo",
          "titulo": "pH extremo",
          "texto": "Esse pH é extremo para a maioria dos peixes de aquário.",
          "acao": "Meça o KH e confira se o teste está na faixa certa (kits de pH têm faixa baixa e alta). Não tente corrigir de uma vez: faça trocas parciais com água tratada e mude devagar.",
          "fonte_curta": "Manual Veterinário Merck: pH 6,5 a 9,0 em água doce. SRAC (aquicultura): abaixo de 5 ou acima de 10, os peixes podem se estressar e morrer.",
          "fontes": ["F3", "PA5", "F2"],
          "base": "FONTE (faixas); os cortes 5,0 e 9,0 e a cor são REGRA PRÁTICA (V4)",
          "some_com_especie": true
        },
        {
          "id": "ph_acido_info",
          "condicao": { "campo": "ph", "op": "entre", "min": 5.0, "max_exclusivo": 6.5, "contexto": "qualquer" },
          "cor": "info",
          "titulo": "Água ácida",
          "texto": "O pH está abaixo de 6,5. Muitos peixes sul-americanos vivem bem assim; outros, não.",
          "acao": "Cadastre as espécies do aquário para o app comparar com a faixa delas.",
          "fonte_curta": "Manual Veterinário Merck: 6,5 a 9,0 é a faixa geral. Estudos de espécies mostram faixas próprias (ex.: o cardinal tolera água muito ácida).",
          "fontes": ["F3", "R9"],
          "base": "FONTE + REGRA PRÁTICA (V4)",
          "some_com_especie": true
        },
        {
          "id": "ph_variacao",
          "condicao": { "tipo": "variacao", "campo": "ph", "delta_abs_min": 1.0, "janela_dias": 7, "contexto": "com_peixes" },
          "cor": "amarelo",
          "titulo": "O pH mudou muito",
          "texto": "O pH mudou {delta} desde a última medição. Mudanças rápidas de pH estressam os peixes; uma queda rápida pode matar.",
          "acao": "Meça o KH. Não corrija com produto: faça trocas parciais pequenas e frequentes com água tratada, para a mudança ser gradual.",
          "fonte_curta": "Manual Veterinário Merck: queda rápida de pH pode matar; trocas pequenas evitam o choque. Embrapa: diferença de dois pontos de pH já estressa os peixes.",
          "fontes": ["F2", "PA10"],
          "base": "FONTE (risco); o corte de 1,0 ponto em 7 dias é REGRA PRÁTICA (V5)",
          "some_com_especie": false
        }
      ],
      "por_que": "Manual Veterinário Merck: pH de referência entre 6,5 e 9,0 em água doce, e a queda rápida de pH pode matar. Mas a faixa certa é a da espécie: o cardinal aguenta água muito ácida e morre em pH 8,8 (INPA).",
      "popular_x_fonte": [
        {
          "se_diz": "O pH ideal é 7 para todo peixe.",
          "fonte_diz": "A faixa geral vai de 6,5 a 9,0, e a certa é a da espécie: o guppy pede de 7,0 a 8,5, e o cardinal morre em pH 8,8.",
          "frase": "Não existe um pH ideal para todos. Vale a faixa das suas espécies, e a estabilidade pesa mais que o número.",
          "fontes": ["F3", "PA5", "R9", "B14"]
        },
        {
          "se_diz": "É só corrigir o pH com produto.",
          "fonte_diz": "Produtos de ajuste de pH são instáveis e fáceis de exagerar, e uma queda rápida de pH pode matar.",
          "frase": "Mudar o pH depressa é mais arriscado que o próprio número. Olhe o KH e mude devagar, com trocas parciais.",
          "fontes": ["B23", "F2", "PA10"]
        },
        {
          "se_diz": "Só o pH importa.",
          "fonte_diz": "O KH segura o pH. As bactérias consomem o KH, e com KH baixo o pH pode desabar.",
          "frase": "O pH é o número; o KH é a reserva que segura esse número. Meça os dois.",
          "fontes": ["F2", "B21", "B23"]
        }
      ]
    },
    {
      "id": "temperatura",
      "nome": "Temperatura",
      "unidade_tela": "°C",
      "faixa_referencia": { "texto": "a das suas espécies; para a maioria dos tropicais, 24 a 26 °C", "min": 24, "max": 26 },
      "o_que_e": "Controla o ritmo do corpo do peixe e o oxigênio da água: água mais quente segura menos oxigênio e deixa a amônia mais tóxica.",
      "o_que_significa_subir": "Calor do ambiente, sol direto ou aquecedor travado ligado.",
      "o_que_significa_cair": "Aquecedor desligado ou fraco, ambiente frio ou troca de água com água fria.",
      "risco": "Fora da faixa da espécie, estresse. Mudanças bruscas estressam mesmo dentro da faixa.",
      "caminho_seguro": [
        "Confira o aquecedor (com termostato) e use termômetro de imersão (o adesivo lê a temperatura da sala).",
        "Na troca de água, iguale a temperatura da água nova.",
        "Mude devagar."
      ],
      "alertas": [
        {
          "id": "temp_variacao",
          "condicao": { "tipo": "variacao", "campo": "temperatura", "delta_abs_min": 3, "janela_dias": 2, "contexto": "com_peixes" },
          "cor": "amarelo",
          "titulo": "A temperatura mudou muito",
          "texto": "A temperatura mudou {delta} °C em pouco tempo. Uma diferença de três graus já estressa os peixes.",
          "acao": "Confira o aquecedor e o termômetro. Na troca de água, iguale a temperatura da água nova.",
          "fonte_curta": "Embrapa: diferença de três graus na temperatura já estressa os peixes.",
          "fontes": ["PA10", "PA8"],
          "base": "FONTE (VIA BUSCA, V6); a janela de 2 dias é REGRA PRÁTICA",
          "some_com_especie": false
        },
        {
          "id": "temp_fora_geral",
          "condicao": { "campo": "temperatura", "op": "fora", "min": 22, "max": 28, "contexto": "sem_especie_cadastrada" },
          "cor": "info",
          "titulo": "Temperatura fora do comum para tropicais",
          "texto": "Para a maioria dos peixes tropicais, a referência fica entre 24 e 26 °C. Algumas espécies pedem água mais fria ou mais quente.",
          "acao": "Cadastre as espécies do aquário para o app comparar com a faixa delas.",
          "fonte_curta": "RSPCA Austrália: 24 a 26 °C para a maioria dos tropicais.",
          "fontes": ["PA4"],
          "base": "FONTE (VIA BUSCA) + margem de 2 °C = REGRA PRÁTICA (V6)",
          "some_com_especie": true
        },
        {
          "id": "temp_quente_info",
          "condicao": { "campo": "temperatura", "op": ">", "valor": 30, "contexto": "com_peixes" },
          "cor": "info",
          "titulo": "Água quente",
          "texto": "Acima de 30 °C, a água segura menos oxigênio e mais amônia fica na forma tóxica.",
          "acao": "Confira se a água se movimenta na superfície e se a amônia está em zero.",
          "fonte_curta": "Manual Veterinário Merck (oxigênio); Embrapa (amônia tóxica por temperatura).",
          "fontes": ["F3", "CG3"],
          "base": "FONTE (mecanismo); o corte de 30 °C é REGRA PRÁTICA (V6)",
          "some_com_especie": false
        }
      ],
      "por_que": "A faixa certa é a da espécie. Para a maioria dos tropicais, a RSPCA Austrália indica de 24 a 26 °C. A Embrapa lembra que três graus de diferença já estressam os peixes.",
      "popular_x_fonte": [
        {
          "se_diz": "Trocar com água fria não tem problema, o aquecedor esquenta.",
          "fonte_diz": "Três graus de diferença já estressam os peixes; a água nova deve ter a mesma temperatura.",
          "frase": "Água nova na mesma temperatura do aquário.",
          "fontes": ["PA10", "PA8"],
          "publicar": false,
          "nota": "Origem do 'se diz' não registrada: só vai para peça depois do ok do CEO (V11)."
        }
      ]
    },
    {
      "id": "kh",
      "nome": "KH (reserva do pH)",
      "unidade_tela": "°dKH",
      "faixa_referencia": { "texto": "depende da espécie; abaixo de 2,8 °dKH a reserva é baixa", "min": 2.8, "max": null },
      "o_que_e": "A reserva que segura o pH. As bactérias do filtro consomem o KH.",
      "o_que_significa_subir": "Água de reposição com mais carbonato, rochas calcárias ou coral triturado.",
      "o_que_significa_cair": "As bactérias e a sujeira consomem o KH; com poucas trocas parciais ele acaba e o pH pode cair de repente.",
      "risco": "KH muito baixo deixa o pH instável e atrapalha as bactérias do filtro.",
      "caminho_seguro": [
        "Trocas parciais regulares com água tratada costumam repor o KH (depende da água da sua cidade).",
        "Meça o KH da água da torneira.",
        "Se precisar subir, faça devagar: coral triturado ou carbonato na mídia sobem o KH e o GH juntos."
      ],
      "alertas": [
        {
          "id": "kh_muito_baixo",
          "condicao": { "campo": "kh", "op": "<", "valor": 1.1, "contexto": "qualquer" },
          "cor": "amarelo",
          "titulo": "KH muito baixo",
          "texto": "O KH está muito baixo: as bactérias do filtro usam o KH para trabalhar e, sem ele, o pH pode cair de repente.",
          "acao": "Meça o pH com mais frequência. Trocas parciais com água tratada costumam repor o KH; confira o KH da água da torneira.",
          "fonte_curta": "UF/IFAS: abaixo de cerca de 20 mg/L de alcalinidade (1,1 °dKH), as bactérias funcionam mal.",
          "fontes": ["F1", "PA6", "F2"],
          "base": "FONTE; 'trocas repõem' é REGRA PRÁTICA (V7)",
          "some_com_especie": false
        },
        {
          "id": "kh_baixo_info",
          "condicao": { "campo": "kh", "op": "entre", "min": 1.1, "max_exclusivo": 2.8, "contexto": "qualquer" },
          "cor": "info",
          "titulo": "Reserva do pH baixa",
          "texto": "Com o KH abaixo de cerca de 2,8 °dKH, o pH pode oscilar e o filtro trabalha pior.",
          "acao": "Meça o pH com mais frequência e mantenha as trocas parciais em dia.",
          "fonte_curta": "Manual Veterinário Merck: alcalinidade de 50 mg/L ou menos (cerca de 2,8 °dKH) inibe o biofiltro.",
          "fontes": ["F2", "B23"],
          "base": "FONTE; a cor é REGRA PRÁTICA (V7)",
          "some_com_especie": false
        },
        {
          "id": "kh_queda",
          "condicao": { "tipo": "variacao", "campo": "kh", "direcao": "queda", "delta_abs_min": 2, "janela_dias": 14, "contexto": "qualquer" },
          "cor": "info",
          "titulo": "O KH está caindo",
          "texto": "O KH caiu {delta} °dKH desde a última medição. As bactérias do filtro e a sujeira consomem o KH aos poucos.",
          "acao": "Mantenha as trocas parciais em dia e meça o pH.",
          "fonte_curta": "Manual Veterinário Merck: o biofiltro consome o bicarbonato e baixa a alcalinidade.",
          "fontes": ["F2", "B21"],
          "base": "FONTE (mecanismo); o corte de 2 °dKH em 14 dias é REGRA PRÁTICA (V7)",
          "some_com_especie": false
        }
      ],
      "por_que": "O KH é a reserva que segura o pH. UF/IFAS: abaixo de cerca de 1,1 °dKH as bactérias do filtro funcionam mal. Manual Veterinário Merck: 2,8 °dKH ou menos já inibe o biofiltro. Peixes de água mole são mantidos com KH baixo, por isso o app só avisa, sem um alvo fixo.",
      "popular_x_fonte": []
    },
    {
      "id": "gh",
      "nome": "GH (dureza geral)",
      "unidade_tela": "°dGH",
      "faixa_referencia": { "texto": "a das suas espécies; acima de 1,1 °dGH em geral", "min": 1.1, "max": null },
      "o_que_e": "O cálcio e o magnésio dissolvidos na água. É diferente do KH: dá para ter um alto e o outro baixo.",
      "o_que_significa_subir": "Rochas calcárias, coral, sais minerais ou água de reposição dura.",
      "o_que_significa_cair": "Água de osmose ou de chuva, ou trocas com água muito mole.",
      "risco": "Fora da dureza da espécie, alguns peixes ficam estressados ou não se reproduzem.",
      "caminho_seguro": [
        "Escolha espécies que combinem com a água que você tem.",
        "Se precisar mudar, faça devagar, misturando águas."
      ],
      "alertas": [
        {
          "id": "gh_muito_mole_info",
          "condicao": { "campo": "gh", "op": "<", "valor": 1.1, "contexto": "qualquer" },
          "cor": "info",
          "titulo": "Água muito mole",
          "texto": "O GH está muito baixo. Algumas espécies vivem bem assim; outras precisam de mais minerais.",
          "acao": "Cadastre as espécies do aquário para o app comparar com a faixa delas.",
          "fonte_curta": "Manual Veterinário Merck: dureza total acima de 20 mg/L de CaCO3 (cerca de 1,1 °dGH) como referência geral.",
          "fontes": ["F3", "B23"],
          "base": "FONTE; a cor é REGRA PRÁTICA (V8)",
          "some_com_especie": true
        }
      ],
      "por_que": "A dureza certa é a da espécie: o guppy pede água dura (8 a 30 °dGH), e killifish africanos, água mole (1 a 10). O Manual Veterinário Merck usa acima de 20 mg/L de CaCO3 como referência geral.",
      "popular_x_fonte": []
    }
  ],
  "frases_gerais": [
    {
      "id": "kit_valor_exato",
      "se_diz": "O kit dá o valor exato. / Fita é tão boa quanto gota.",
      "fonte_diz": "O kit de gota lê degraus de cor; num estudo da Auburn (2015), as fitas destoaram na medição de nitrato.",
      "frase": "O teste mostra uma faixa, não um número exato. Compare sempre do mesmo jeito, no mesmo horário.",
      "fontes": ["PA12", "PA14"]
    }
  ],
  "fontes": {
    "F1": { "nome_curto": "UF/IFAS", "titulo": "Ammonia in Aquatic Systems (FA031)", "url": "https://ask.ifas.ufl.edu/publication/FA031", "acesso": "aberta" },
    "F2": { "nome_curto": "Manual Veterinário Merck", "titulo": "Management of Aquarium Fish", "url": "https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/management-of-aquarium-fish", "acesso": "aberta" },
    "F3": { "nome_curto": "Manual Veterinário Merck", "titulo": "Normal Reference Ranges for Routine Water Quality Analysis", "url": "https://www.merckvetmanual.com/multimedia/table/normal-reference-ranges-for-routine-water-quality-analysis", "acesso": "aberta" },
    "CG1": { "nome_curto": "SRAC", "titulo": "How to Start a Biofilter (SRAC 4502)", "url": "https://www.srac.msstate.edu/pdfs/Fact%20Sheets/4502%20How%20to%20Start%20a%20Biofilter.pdf", "acesso": "aberta" },
    "CG2": { "nome_curto": "RSPCA Austrália", "titulo": "Why is water quality important when setting up a fish aquarium?", "url": "https://kb.rspca.org.au/knowledge-base/why-is-water-quality-important-when-setting-up-a-fish-aquarium/", "acesso": "aberta" },
    "CG3": { "nome_curto": "Embrapa", "titulo": "Comunicado Técnico 47 (Queiroz & Boeira, 2008)", "url": "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/31730/1/comunicado47.pdf", "acesso": "aberta" },
    "CG4": { "nome_curto": "Instituto de Pesca (SP)", "titulo": "Pereira & Mercante (2005), Boletim do Instituto de Pesca 31(1)", "url": "https://institutodepesca.org/index.php/bip/article/download/Pereira_31_1/Pereira_31_1/1838", "acesso": "aberta" },
    "R9": { "nome_curto": "INPA", "titulo": "Oliveira et al. (2008), Acta Amazonica 38(4), cardinal", "url": "https://www.scielo.br/j/aa/a/FYCZj6tsgyvP9QcXYh7yPnC/?lang=en", "acesso": "aberta" },
    "B14": { "nome_curto": "Seriously Fish", "titulo": "Guppy (Poecilia reticulata)", "url": "ver base-conhecimento/fontes.md", "acesso": "aberta" },
    "B21": { "nome_curto": "UF/IFAS", "titulo": "= F1", "url": "https://ask.ifas.ufl.edu/publication/FA031", "acesso": "aberta" },
    "B23": { "nome_curto": "Aquarium Co-Op", "titulo": "Guia de pH, GH e KH", "url": "https://aquariumcoop.com/blogs/aquarium/ph-gh-kh", "acesso": "aberta" },
    "PA4": { "nome_curto": "RSPCA Austrália", "titulo": "Base de conhecimento: temperatura para tropicais", "url": "https://kb.rspca.org.au/", "acesso": "via_busca" },
    "PA5": { "nome_curto": "SRAC", "titulo": "Wurts & Durborow (1992), SRAC 464", "url": "https://srac-aquaponics.tamu.edu/fact-sheets/serve/4", "acesso": "via_busca" },
    "PA6": { "nome_curto": "SRAC", "titulo": "Wurts & Masser (2013), SRAC 4100", "url": "https://srac.tamu.edu/fact-sheets", "acesso": "via_busca" },
    "PA7": { "nome_curto": "Camargo e colegas (2005)", "titulo": "Nitrate toxicity to aquatic animals, Chemosphere 58(9): 1255-1267", "url": "https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/89304", "acesso": "via_busca" },
    "PA8": { "nome_curto": "OATA", "titulo": "Water quality criteria (out/2022)", "url": "https://ornamentalfish.org/wp-content/uploads/OATA-Water-quality-criteria-Oct-2022.pdf", "acesso": "via_busca" },
    "PA10": { "nome_curto": "Embrapa", "titulo": "Fujimoto (2012), Aclimatação e quarentena", "url": "https://www.infoteca.cnptia.embrapa.br/infoteca/handle/doc/1014607", "acesso": "via_busca" },
    "PA12": { "nome_curto": "bula de kit vendido no Brasil", "titulo": "Bulas de testes de água doce (fabricante)", "url": "https://www.alconpet.com.br/peixes/produto/labcon-test-amonia-toxica-agua-doce", "acesso": "aberta", "nota": "não citar a marca na tela" },
    "PA13": { "nome_curto": "Governo de Queensland; Univ. da Geórgia", "titulo": "Fatores de conversão N para íon", "url": "https://aesl.ces.uga.edu/water/recommendations", "acesso": "via_busca" },
    "PA14": { "nome_curto": "Auburn University (2015)", "titulo": "Assessing the Reliability of Water Test Kits for Use in Small-Scale Aquaculture", "url": "https://etd.auburn.edu/handle/10415/4974", "acesso": "via_busca" }
  }
}
;
