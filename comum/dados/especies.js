/* gerado por atualizar-dados.ps1 a partir de especies.json — não edite à mão */
window.PARAGON_ESPECIES = {
  "versao": "2026-10-28",
  "aviso": "Faixas de referência com fonte. Cada aquário é um caso; na dúvida, consulte um especialista.",
  "especies": [
    {
      "id": "betta",
      "nome_popular": "Betta",
      "artigo": "o",
      "outros_nomes": ["Peixe-de-briga", "Beta"],
      "nome_cientifico": "Betta splendens",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 6, "max": 7 },
      "temperatura_c": [22, 30],
      "ph": [6.0, 8.0],
      "gh_dgh": [1, 15],
      "litragem_min_l": { "conservador": 41, "pratica_comum": 20, "observacao": "Seriously Fish: base de 45x30 cm (cerca de 41 L) para um macho. Fontes de bem-estar citadas no Brasil e site brasileiro falam em 20 L. Potes de 3 a 5 L não são recomendados." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "insetivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["barbo-sumatra", "botia-palhaco", "guppy", "acara-bandeira", "tricogaster", "colisa-lalia", "colisa-sunset", "colisa-azul", "tetra-colombiano"],
      "companhia": { "cor": "amarelo", "aceita": [], "texto": "O betta é territorial e pode brigar com outros peixes; o mais indicado é mantê-lo sozinho. Se for juntar, escolha peixes calmos, sem nadadeira longa, e observe." },
      "notas": [
        "Dois machos juntos, nunca.",
        "O mais indicado é mantê-lo sozinho: a Seriously Fish diz que, na maioria dos casos, ele fica melhor só, e a RSPCA Austrália não recomenda juntar o macho com outros peixes para quem está começando.",
        "Filtro de vazão suave: correnteza forte atrapalha.",
        "Nadadeiras longas atraem peixes que beliscam.",
        "Evite companheiros de nadadeira longa ou corpo parecido (guppy, acará-bandeira, tricogaster, colisa-lalia): o macho os toma por rivais.",
        "pH: as fontes aceitam de 6 a 8 para o betta de criação; o ideal mais citado fica perto do neutro (RSPCA Austrália: 6,5 a 7,5)."
      ],
      "popular_x_fonte": [
        { "popular": "Betta vive bem em potinho.", "fonte_diz": "A Seriously Fish pede cerca de 41 L, e o FishBase desaconselha recipientes muito pequenos." },
        { "popular": "Betta combina com qualquer peixe de comunidade.", "fonte_diz": "A Seriously Fish diz que ele não é recomendado para o aquário comunitário comum e que, na maioria dos casos, fica melhor sozinho; a convivência é exceção, não a regra." },
        { "popular": "O betta não vai até pH 8; o ideal é de 6 a 7.", "fonte_diz": "Seriously Fish e FishBase aceitam de 6 a 8 para o betta de criação (o selvagem prefere de 5 a 7). A RSPCA Austrália indica 6,5 a 7,5 como ideal, e um estudo brasileiro de criação de larvas trabalhou com pH médio de 7,2, dentro do padrão da espécie segundo os autores. Ficar entre 6 e 7 é uma boa escolha (prática comum), mas a fonte não trata 7 a 8 como problema para o betta de loja." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 45x30 cm, cerca de 41 L, para um macho.", "brasil": "Aquarismo Paulista: ficha com 36 L (40x30x30 cm) e resposta a leitor dizendo que 'a partir de 20 litros é o suficiente'. Os 20 L batem com o que outros sites brasileiros dizem.", "fonte_brasil": "Aquarismo Paulista — Betta splendens (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Betta splendens", "url": "https://www.seriouslyfish.com/species/betta-splendens/" },
        { "titulo": "FishBase — Betta splendens", "url": "https://www.fishbase.se/summary/Betta-splendens.html" },
        { "titulo": "RSPCA Austrália — How should I care for my Siamese fighting fish?", "url": "https://kb.rspca.org.au/knowledge-base/how-should-i-care-for-my-siamese-fighting-fish/" },
        { "titulo": "Sales et al. 2016 — Fotoperíodo e frequência alimentar na larvicultura do peixe beta (Arq. Bras. Med. Vet. Zootec. 68(4))", "url": "https://doi.org/10.1590/1678-4162-8746" },
        { "titulo": "Aquarismo Paulista — Betta (site brasileiro; só para 'prática comum')", "url": "https://www.aquarismopaulista.com/betta-splendens/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "guppy",
      "nome_popular": "Guppy",
      "artigo": "o",
      "outros_nomes": ["Lebiste", "Barrigudinho"],
      "nome_cientifico": "Poecilia reticulata",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 5, "max": 6 },
      "temperatura_c": [17, 28],
      "ph": [7.0, 8.5],
      "gh_dgh": [8, 30],
      "litragem_min_l": { "conservador": 41, "pratica_comum": 20, "observacao": "Referência de fora (Seriously Fish): base de 45x30 cm (cerca de 41 L). Prática brasileira: criadores da Confederação dos Criadores de Guppy do Brasil usam 20 L para 2 machos e 4 fêmeas, com troca de 30% da água duas vezes por semana, e o Aquarismo Paulista aceita 3 machos em 24 L com filtro. Para um grupo de 6 a 8, criadores e sites brasileiros falam em 40 L." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 3,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["barbo-sumatra", "botia-palhaco", "betta", "colisa-lalia", "colisa-sunset", "colisa-azul", "tetra-colombiano"],
      "notas": [
        "Mantenha mais fêmeas que machos.",
        "Reproduz muito, e os adultos comem os filhotes.",
        "Gosta de água dura e alcalina."
      ],
      "popular_x_fonte": [
        { "popular": "Guppy aguenta qualquer água.", "fonte_diz": "É peixe de água dura: pH 7,0 a 8,5 e GH 8 a 30 (Seriously Fish)." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 45x30 cm, cerca de 41 L.", "brasil": "Criadores brasileiros usam aquários menores com manutenção pesada: a CCG cita 20 L para 2 machos e 4 fêmeas, com troca de 30% da água duas vezes por semana, e 40 L como aquário prático para crescer e manter. Guppy de Linhagem (criador do ES) e Aquário Vivo: 40 L para um grupo de 6 a 8. Aquarismo Paulista: ficha com 36 L e resposta aceitando 3 machos em 24 L com filtro e termostato.", "fonte_brasil": "Confederação dos Criadores de Guppy do Brasil (CCG), guia do criador; Guppy de Linhagem; Aquário Vivo (2026); Aquarismo Paulista" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Poecilia reticulata", "url": "https://www.seriouslyfish.com/species/poecilia-reticulata/" },
        { "titulo": "FishBase — Poecilia reticulata", "url": "https://www.fishbase.se/summary/Poecilia-reticulata.html" },
        { "titulo": "CCG — Confederação dos Criadores de Guppy do Brasil, guia do criador (prática brasileira)", "url": "https://ccg.org.br/categoria/informacao/" },
        { "titulo": "Guppy de Linhagem — Como cuidar de guppy (prática brasileira)", "url": "https://www.guppydelinhagem.com.br/guia/como-cuidar-de-guppy" },
        { "titulo": "Aquarismo Paulista — Lebiste (Poecilia reticulata), ficha e respostas (prática brasileira)", "url": "https://www.aquarismopaulista.com/poecilia-reticulata/" }
      ],
      "validado_ceo": false,
      "ilustracao": "02-visual/ilustracoes-especies/guppy-macho-ilustracao-07.png"
    },
    {
      "id": "neon",
      "nome_popular": "Neon",
      "artigo": "o",
      "outros_nomes": ["Tetra-neon", "Neon-comum"],
      "nome_cientifico": "Paracheirodon innesi",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 3, "max": 3 },
      "temperatura_c": [21, 25],
      "ph": [4.0, 7.5],
      "gh_dgh": [1, 12],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A fonte pede base de 60x30 cm (cerca de 54 L) para o cardume. Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Peixe de cardume: a fonte pede 8 a 10 juntos.",
        "Gosta de água mais fresca que o cardinal (21 a 25 °C).",
        "Cabe na boca de ciclídeos médios e grandes."
      ],
      "popular_x_fonte": [
        { "popular": "Dois ou três neons já bastam.", "fonte_diz": "A Seriously Fish pede um grupo de pelo menos 8 a 10." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L.", "brasil": "Aquarismo Paulista: ficha com 56 L (60x30x30 cm); em resposta a leitor, aceitou 8 a 10 neons sozinhos num aquário de 50x30x30 cm (cerca de 45 L). Só um site brasileiro: ainda não é consenso.", "fonte_brasil": "Aquarismo Paulista — Paracheirodon innesi (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Paracheirodon innesi", "url": "https://www.seriouslyfish.com/species/paracheirodon-innesi/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "acara-bandeira",
      "nome_popular": "Acará-bandeira",
      "artigo": "o",
      "outros_nomes": ["Escalar", "Peixe-anjo", "Bandeira"],
      "nome_cientifico": "Pterophyllum scalare",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 15, "max": 15 },
      "temperatura_c": [24, 30],
      "ph": [6.0, 7.4],
      "gh_dgh": [0, 15],
      "litragem_min_l": { "conservador": 200, "pratica_comum": 200, "observacao": "A fonte pede 100x40x50 cm (cerca de 200 L) e altura de pelo menos 50 cm. Site brasileiro também fala em 200 L." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 5,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["barbo-sumatra", "betta"],
      "notas": [
        "O adulto pode comer tetras pequenos, como o neon.",
        "Corpo alto: precisa de aquário com 50 cm de altura ou mais.",
        "Casais formados defendem território na hora de reproduzir."
      ],
      "popular_x_fonte": [
        { "popular": "Bandeira e neon é combinação clássica.", "fonte_diz": "A Seriously Fish avisa que o bandeira adulto pode comer tetras pequenos." },
        { "popular": "Um bandeira sozinho vive bem.", "fonte_diz": "O FishBase cita grupos de 5 ou mais em aquário de 100 cm ou maior." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Pterophyllum scalare", "url": "https://www.seriouslyfish.com/species/pterophyllum-scalare/" },
        { "titulo": "FishBase — Pterophyllum scalare", "url": "https://www.fishbase.se/summary/Pterophyllum-scalare.html" }
      ],
      "validado_ceo": true,
      "ilustracao": "02-visual/ilustracoes-especies/acara-bandeira-prateado-ilustracao-08.png"
    },
    {
      "id": "oscar",
      "nome_popular": "Oscar",
      "artigo": "o",
      "outros_nomes": ["Apaiari", "Acará-açu", "Acará-grande"],
      "nome_cientifico": "Astronotus ocellatus",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 30, "max": 45.7 },
      "temperatura_c": [20, 28],
      "ph": [6.0, 7.5],
      "gh_dgh": [5, 20],
      "litragem_min_l": { "conservador": 540, "pratica_comum": 200, "observacao": "Seriously Fish: cerca de 540 L mal bastam para um adulto; casal pede mais. Sites brasileiros: 200 L para 1 Oscar ou casal já formado, com filtragem forte e troca semanal. Comunitário: mais de 300 L." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "meio",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "arranca",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Predador: come qualquer peixe que caiba na boca.",
        "Dois Oscars que não são casal tendem a brigar.",
        "Cava o fundo e quebra aquecedor: proteja o equipamento."
      ],
      "popular_x_fonte": [
        { "popular": "200 L bastam para um Oscar.", "fonte_diz": "A Seriously Fish fala em cerca de 540 L e diz que isso mal basta para um adulto." },
        { "popular": "Peixe vivo de isca é a melhor comida.", "fonte_diz": "A Seriously Fish vê pouco benefício e risco de parasitas; o Practical Fishkeeping alerta para a tiaminase dos peixes-isca." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Astronotus ocellatus", "url": "https://www.seriouslyfish.com/species/astronotus-ocellatus/" },
        { "titulo": "FishBase — Astronotus ocellatus", "url": "https://www.fishbase.se/summary/Astronotus-ocellatus.html" },
        { "titulo": "Practical Fishkeeping — Predator fish and thiaminase", "url": "https://www.practicalfishkeeping.co.uk/features/what-you-need-to-know-about-predator-fish-and-thiaminase/" },
        { "titulo": "Aquarismo Paulista — Oscar (site brasileiro; só para 'prática comum')", "url": "https://www.aquarismopaulista.com/astronotus-ocellatus/" }
      ],
      "validado_ceo": true,
      "ilustracao": "02-visual/ilustracoes-especies/oscar-red-tiger-ilustracao-02.png"
    },
    {
      "id": "kinguio",
      "nome_popular": "Kinguio",
      "artigo": "o",
      "outros_nomes": ["Peixe-dourado", "Goldfish", "Peixe-vermelho"],
      "nome_cientifico": "Carassius auratus",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 10, "max": 48 },
      "temperatura_c": [18, 24],
      "ph": [6.5, 7.5],
      "gh_dgh": [5, 19],
      "litragem_min_l": { "conservador": 112, "pratica_comum": 60, "observacao": "SPCA Nova Zelândia: 112 L para um kinguio comum (75 L para os de fantasia), mais 40 L por peixe extra. RSPCA Reino Unido: pelo menos 60 L por peixe. Não achamos fonte brasileira com litros. Aquário redondo não serve." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 2,
      "zona": "todas",
      "dieta": "onivoro",
      "come_peixes_pequenos": true,
      "plantas": "come",
      "camaroes": "come",
      "nao_misturar_com": ["barbo-sumatra", "oscar", "polypterus-senegalus", "polypterus-delhezi", "polypterus-ornatipinnis", "polypterus-bichir", "polypterus-endlicherii", "peixe-faca-preto", "aruana", "frontosa", "faca-palhaco"],
      "companhia": { "cor": "amarelo", "aceita": ["paulistinha"], "texto": "A RSPCA indica para o kinguio a companhia de outros kinguios ou de peixes de água temperada, como os danios (paulistinha). Com peixes tropicais, a temperatura fica no limite dos dois, e os kinguios de fantasia, mais lentos, podem perder a comida para peixes rápidos." },
      "notas": [
        "Peixe de água fria a temperada: vive sem aquecedor. Com tropicais que pedem 22 °C ou mais, a água fica no limite dos dois.",
        "Pode passar de 40 cm e viver décadas.",
        "Suja muito a água: filtro forte e trocas regulares.",
        "No aquário, costuma ficar com uns 10 cm: cabe na boca de predadores grandes (Oscar, Polypterus, aruanã, frontosa, peixes-faca)."
      ],
      "popular_x_fonte": [
        { "popular": "Kinguio vive em aquário redondo.", "fonte_diz": "RSPCA e SPCA dizem que aquário redondo é pequeno demais e deve ser evitado." },
        { "popular": "Kinguio é pequeno e vive pouco.", "fonte_diz": "Pode chegar a cerca de 45 cm e viver décadas (SPCA Nova Zelândia)." }
      ],
      "internacional_x_brasil": [
        { "tema": "Temperatura", "internacional": "RSPCA Reino Unido: 10 a 21 °C. RSPCA Austrália: 20 a 24 °C.", "brasil": "Estudo brasileiro (Motta et al. 2023, Braz. J. Biol.): ovos e larvas de kinguio se desenvolveram de 18 a 30 °C sem queda significativa na eclosão (melhor ponto estimado: 23,9 °C); 34 °C foi letal. A ferramenta usa 18 a 24 °C.", "fonte_brasil": "Motta et al. 2023 — Brazilian Journal of Biology" },
        { "tema": "Litragem", "internacional": "SPCA Nova Zelândia: 112 L para um kinguio comum, mais 40 L por peixe. RSPCA Reino Unido: pelo menos 60 L por peixe.", "brasil": "Aquarismo Paulista: a ficha pede 120 L para o primeiro kinguio, mais uns 30 L por peixe; o artigo sobre aquário de kinguio (Rosana Ferreira) fala em 60 a 80 L por adulto e, em resposta a leitor, em no mínimo 50 L por kinguio com filtragem forte. A referência brasileira fica perto da britânica.", "fonte_brasil": "Aquarismo Paulista — Kinguio (ficha) e 'Aquário para Kinguios, considerações gerais' (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Motta et al. 2023 — Effect of temperature on embryonic development and first exogenous feeding of goldfish (Braz. J. Biol. 83; estudo brasileiro)", "url": "https://www.scielo.br/j/bjb/a/xXHPTXjsWrSzrWGxqTHtcKw/?lang=en" },
        { "titulo": "RSPCA Austrália — How should I keep and care for my goldfish?", "url": "https://kb.rspca.org.au/knowledge-base/how-should-i-keep-and-care-for-my-goldfish/" },
        { "titulo": "RSPCA Reino Unido — Choosing an aquarium", "url": "https://www.rspca.org.uk/adviceandwelfare/pets/fish/environment" },
        { "titulo": "SPCA Nova Zelândia — Debunking goldfish myths", "url": "https://spca.nz/advice-and-welfare/article/debunking-goldfish-myths" },
        { "titulo": "FishBase — Carassius auratus", "url": "https://www.fishbase.se/summary/Carassius-auratus.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "coridora-bronze",
      "nome_popular": "Coridora-bronze",
      "artigo": "a",
      "outros_nomes": ["Coridora", "Corydoras aeneus"],
      "nome_cientifico": "Osteogaster aenea",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 7.5, "max": 7.5 },
      "temperatura_c": [21, 27],
      "ph": [6.0, 8.0],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 72, "pratica_comum": 72, "observacao": "A fonte pede base de 80x30 cm (cerca de 72 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 6,
      "zona": "fundo",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Vive em grupo: a fonte fala em 4 a 6 ou mais.",
        "Prefere areia fina no fundo.",
        "Os espinhos das nadadeiras furam a pele: cuidado ao pegar."
      ],
      "popular_x_fonte": [
        { "popular": "Coridora limpa o fundo e vive dos restos.", "fonte_diz": "Precisa de comida própria; a fonte diz que em nenhuma circunstância deve viver de restos." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Osteogaster aenea (antes Corydoras aeneus)", "url": "https://www.seriouslyfish.com/species/corydoras-aeneus/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "platy",
      "nome_popular": "Platy",
      "artigo": "o",
      "outros_nomes": ["Plati"],
      "nome_cientifico": "Xiphophorus maculatus",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 5, "max": 5 },
      "temperatura_c": [20, 26],
      "ph": [7.0, 8.2],
      "gh_dgh": [10, 30],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A fonte pede base de 60x30 cm (cerca de 54 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 3,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Mantenha várias fêmeas para cada macho.",
        "Gosta de água dura e alcalina.",
        "Aprecia aquário plantado."
      ],
      "popular_x_fonte": [
        { "popular": "Platy vive em qualquer aquário pequeno.", "fonte_diz": "A Seriously Fish pede base de 60x30 cm, cerca de 54 L." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L.", "brasil": "Aquarismo Paulista: ficha com 80x30 cm 'desejável'; em respostas a leitores, aceitou 6 poecilídeos em 30 L 'com boa manutenção' e cerca de 6 platys em 38 L (1 macho para 2 fêmeas), e achou 6 platys em 13 L 'muito peixe para pouco espaço'. Só um site brasileiro: ainda não é consenso.", "fonte_brasil": "Aquarismo Paulista — Plati (Xiphophorus maculatus), respostas a leitores (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Xiphophorus maculatus", "url": "https://www.seriouslyfish.com/species/xiphophorus-maculatus/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "molinesia",
      "nome_popular": "Molinésia",
      "artigo": "a",
      "outros_nomes": ["Molly", "Molinésia-negra"],
      "nome_cientifico": "Poecilia sphenops",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 8, "max": 8 },
      "temperatura_c": [21, 28],
      "ph": [7.0, 8.5],
      "gh_dgh": [15, 30],
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "A fonte pede base de 90x30 cm (cerca de 81 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 3,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Pede água bem dura (GH 15 a 30): não serve para todo comunitário.",
        "Grande parte da dieta deve ser vegetal.",
        "Não misture com a molinésia-vela: as duas cruzam."
      ],
      "popular_x_fonte": [
        { "popular": "Molinésia precisa de sal na água.", "fonte_diz": "A Seriously Fish diz que o sal não é necessário; cálcio e magnésio (água dura) importam mais." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 90x30 cm, cerca de 81 L.", "brasil": "Aqui a referência brasileira é maior: Aquarismo Paulista pede 96 L (80x30x40 cm) e Fazenda Submersa, 100 L, para o grupo. Para um macho sozinho, o Aquarismo Paulista aceitou 20 L com filtro e aquecedor.", "fonte_brasil": "Aquarismo Paulista — Molinésia negra (Poecilia sphenops); Fazenda Submersa (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Poecilia sphenops", "url": "https://www.seriouslyfish.com/species/poecilia-sphenops/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "cascudo-bodo",
      "nome_popular": "Cascudo-bodó",
      "artigo": "o",
      "outros_nomes": ["Bodó", "Acari-bodó", "Cascudo-comum", "Cascudo-leopardo", "Plecostomus", "Pleco", "Limpa-vidro"],
      "cascudo": true,
      "codigo_l": [],
      "nome_cientifico": "Pterygoplichthys pardalis",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 28, "max": 58 },
      "temperatura_c": [23, 28],
      "ph": [7.0, 7.5],
      "gh_dgh": [10, 20],
      "litragem_min_l": { "conservador": 540, "pratica_comum": 284, "observacao": "Nenhuma fonte técnica aberta dá litros. Conservador = mesma base que a Seriously Fish pede para peixes de porte parecido (150x60 cm): regra prática. Prática comum: 284 L citados em wiki de comunidade. Não achamos fonte brasileira com litros." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Como reconhecer: nadadeira dorsal alta, em vela, com 10 a 13 raios (gênero Pterygoplichthys). A maioria dos Hypostomus tem 7. Entre as espécies de vela, só o nome científico da loja resolve.",
        "Pode passar de 50 cm: planeje para o adulto.",
        "Nunca solte em rio ou lago: fora da Amazônia é espécie invasora."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo é pequeno e serve para limpar o vidro.", "fonte_diz": "O FishBase registra até 57,8 cm para esta espécie; ela precisa de alimento próprio." }
      ],
      "internacional_x_brasil": [
        { "tema": "Tamanho", "internacional": "FishBase: até 57,8 cm.", "brasil": "Estudo no baixo Amazonas (Sousa et al. 2019, 1.200 peixes): média de 28 cm na pesca, com tamanho assintótico estimado em 38,9 cm. Na natureza daqui, a maioria fica bem abaixo do recorde.", "fonte_brasil": "Sousa et al. 2019 — Boletim do Instituto de Pesca 45(2)" },
        { "tema": "Origem", "internacional": "Introduzido e invasor em vários países.", "brasil": "Nativo da Amazônia (o bodó é pescado e consumido lá). Consta na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "FishBase — Pterygoplichthys pardalis", "url": "https://www.fishbase.se/summary/Pterygoplichthys-pardalis.html" },
        { "titulo": "Sousa et al. 2019 — Growth parameters and yield per recruit analysis for Pterygoplichthys pardalis, low Amazonas River (Boletim do Instituto de Pesca 45(2); estudo brasileiro)", "url": "https://institutodepesca.org/index.php/bip/article/view/1356" },
        { "titulo": "Birindelli, Zanata & Lima 2007 — Hypostomus chrysostiktos (Neotropical Ichthyology 5(3); raios da dorsal: 7 na maioria dos loricariídeos, 10 a 13 em Pterygoplichthys)", "url": "https://www.scielo.br/j/ni/a/CCQnv558MqjxsSWBLYhFtxz/?lang=en" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" },
        { "titulo": "The Aquarium Wiki — Pterygoplichthys pardalis (comunidade; só para 'prática comum')", "url": "https://theaquariumwiki.com/wiki/Pterygoplichthys_pardalis" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-hypostomus",
      "nome_popular": "Cascudo Hypostomus",
      "artigo": "o",
      "outros_nomes": ["Cascudo-comum", "Cascudo nativo", "Cascudo-de-rio", "Acari"],
      "cascudo": true,
      "codigo_l": [],
      "nome_cientifico": "Hypostomus spp. (grupo; referência: H. plecostomus e H. commersoni)",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 25, "max": 60.5 },
      "temperatura_c": [20, 28],
      "ph": [6.2, 8.2],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 540, "pratica_comum": 540, "observacao": "O gênero tem cerca de 120 espécies, de uns 15 cm a mais de 60 cm. Sem o nome científico, planeje para as grandes: 540 L é regra prática (mesma base dos cascudos grandes). Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Como reconhecer: dorsal com 7 raios ramificados, sem a vela alta do bodó (que tem 10 a 13).",
        "São muitas espécies parecidas: o tamanho adulto muda de uma para outra. Peça o nome científico.",
        "Nunca solte em rio ou lago: mesmo nativo, pode ser de outra bacia."
      ],
      "popular_x_fonte": [
        { "popular": "Todo cascudo de loja é a mesma espécie.", "fonte_diz": "O gênero Hypostomus tem cerca de 120 espécies, e a variação de cor e formato dificulta a identificação de algumas delas (dissertação da UEL, 2007)." }
      ],
      "internacional_x_brasil": [
        { "tema": "Qual espécie é", "internacional": "Fichas de fora usam H. plecostomus (Guianas; até 25 cm sem a cauda) como o 'pleco' padrão.", "brasil": "No Brasil o nome cobre espécies nativas de várias bacias: a IN 1/2012 libera a captura para aquário de 27 espécies de Hypostomus, como H. commersoni (Sul; até 60,5 cm no FishBase). O H. plecostomus nem consta nessa lista.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012, Anexo I" }
      ],
      "fontes": [
        { "titulo": "FishBase — Hypostomus plecostomus", "url": "https://www.fishbase.se/summary/Hypostomus-plecostomus.html" },
        { "titulo": "FishBase — Hypostomus commersoni", "url": "https://www.fishbase.se/summary/Hypostomus-commersoni.html" },
        { "titulo": "Birindelli, Zanata & Lima 2007 — Neotropical Ichthyology 5(3) (raios da dorsal)", "url": "https://www.scielo.br/j/ni/a/CCQnv558MqjxsSWBLYhFtxz/?lang=en" },
        { "titulo": "Dissertação UEL 2007 — citogenética de Hypostomus (cerca de 120 espécies; identificação difícil) (visto no buscador)", "url": "https://repositorio.uel.br/bitstreams/4244bafa-e2c2-4c7b-adb6-6843797a49ef/download" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-gibbiceps",
      "nome_popular": "Cascudo-gibbiceps",
      "artigo": "o",
      "outros_nomes": ["Cascudo-leopardo", "Pleco-leopardo", "Sailfin pleco", "L165", "L 165", "L-165", "L083", "L83", "L 083", "L-083"],
      "cascudo": true,
      "codigo_l": ["L165", "L083"],
      "nome_cientifico": "Pterygoplichthys gibbiceps",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 50, "max": 50 },
      "temperatura_c": [23, 27],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 19],
      "litragem_min_l": { "conservador": 540, "pratica_comum": 540, "observacao": "Sem fonte técnica com litros: 540 L é regra prática (mesma base dos peixes de 35 a 50 cm). Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, item 637, com os códigos L083 e L165). Compre com nota fiscal e nunca solte na natureza." },
      "notas": [
        "Como reconhecer: dorsal em vela (10 a 13 raios), como o bodó. 'Leopardo' é usado para os dois: só o nome científico separa com segurança.",
        "Chega a 50 cm (comprimento total no FishBase). Código L: L165 é o mais aceito; o L083 também é ligado a ele, mas uma base alemã o atribui a outra espécie de vela (P. xinguensis).",
        "Ativo à noite; respira ar quando a água tem pouco oxigênio."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo-leopardo é pequeno.", "fonte_diz": "O FishBase registra até 50 cm para esta espécie." }
      ],
      "internacional_x_brasil": [
        { "tema": "Origem", "internacional": "Vendido no mundo todo como 'sailfin pleco'.", "brasil": "Nativo da Amazônia; consta na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "FishBase — Pterygoplichthys gibbiceps", "url": "https://www.fishbase.se/summary/Pterygoplichthys-gibbiceps.html" },
        { "titulo": "Welsfans/Südamerikafans — Pterygoplichthys gibbiceps, L165 e L83: quem é quem (base alemã de L-numbers)", "url": "https://www.suedamerikafans.de/en/?p=44332" },
        { "titulo": "Birindelli, Zanata & Lima 2007 — Neotropical Ichthyology 5(3) (raios da dorsal)", "url": "https://www.scielo.br/j/ni/a/CCQnv558MqjxsSWBLYhFtxz/?lang=en" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-anisitsi",
      "nome_popular": "Cascudo-anisitsi",
      "artigo": "o",
      "outros_nomes": ["Snow pleco", "Cascudo-do-Paraná"],
      "cascudo": true,
      "codigo_l": [],
      "nome_cientifico": "Pterygoplichthys anisitsi",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 55, "max": 55 },
      "temperatura_c": [21, 24],
      "ph": [6.5, 8.2],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 540, "pratica_comum": 540, "observacao": "Sem fonte técnica com litros: 540 L é regra prática (mesma base dos cascudos grandes). Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Como reconhecer: dorsal em vela (10 a 13 raios), como o bodó; só o nome científico separa os dois com segurança.",
        "Chega a 55 cm (comprimento total no FishBase).",
        "Vem de rios mais frescos (bacias do Paraná, Paraguai e Uruguai): faixa de 21 a 24 °C."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo aguenta qualquer temperatura de aquário tropical.", "fonte_diz": "O FishBase dá 21 a 24 °C para esta espécie, abaixo da faixa de muitos tropicais." }
      ],
      "internacional_x_brasil": [
        { "tema": "Origem", "internacional": "Introduzido nos EUA e no sul da Ásia, provavelmente pelo comércio de aquário.", "brasil": "Nativo das bacias do Paraná, Paraguai e Uruguai; consta na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "FishBase — Pterygoplichthys anisitsi", "url": "https://www.fishbase.se/summary/Pterygoplichthys-anisitsi.html" },
        { "titulo": "Birindelli, Zanata & Lima 2007 — Neotropical Ichthyology 5(3) (raios da dorsal)", "url": "https://www.scielo.br/j/ni/a/CCQnv558MqjxsSWBLYhFtxz/?lang=en" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-ancistrus",
      "nome_popular": "Cascudo-ancistrus",
      "artigo": "o",
      "outros_nomes": ["Ancistrus", "Cascudo-bristlenose", "Cascudinho"],
      "cascudo": true,
      "codigo_l": [],
      "territorial_com_cascudos": true,
      "nome_cientifico": "Ancistrus sp. (cf. cirrhosus)",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 12.5, "max": 12.5 },
      "temperatura_c": [21, 26],
      "ph": [5.5, 7.5],
      "gh_dgh": [1, 15],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A fonte pede base de 60x30 cm (cerca de 54 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Territorial com outros ancistrus e cascudos de formato parecido.",
        "Precisa de comida própria: vegetais e spirulina.",
        "Fica pequeno perto do bodó e dos outros cascudos grandes."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo limpa o aquário sozinho.", "fonte_diz": "A Seriously Fish indica dieta própria, com vegetais e spirulina." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L.", "brasil": "Fazenda Submersa (ancistrus véu): aquário de pelo menos 80 cm de comprimento por 35 cm de largura, com tocas, raízes e pedras. A referência brasileira encontrada é maior que a de fora. (Visto pelo buscador.)", "fonte_brasil": "Fazenda Submersa — Cascudo Ancistrus véu (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Ancistrus sp. '3' (Common Bristlenose)", "url": "https://seriouslyfish.com/species/ancistrus-cf-cirrhosus" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "espadinha",
      "nome_popular": "Espadinha",
      "artigo": "o",
      "outros_nomes": ["Espada", "Xipho"],
      "nome_cientifico": "Xiphophorus hellerii",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 14, "max": 14 },
      "temperatura_c": [16, 28],
      "ph": [7.0, 8.0],
      "gh_dgh": [10, 25],
      "litragem_min_l": { "conservador": 108, "pratica_comum": 108, "observacao": "A fonte pede base de 120x30 cm (cerca de 108 L) como o menor aquário a considerar." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 3,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Machos disputam posição entre si em aquário apertado.",
        "Nada muito: precisa de aquário comprido.",
        "Mantenha mais fêmeas que machos."
      ],
      "popular_x_fonte": [
        { "popular": "Espadinha é igual ao platy e cabe no mesmo aquário pequeno.", "fonte_diz": "A Seriously Fish pede base de 120 cm para a espadinha, o dobro do platy." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 120x30 cm, cerca de 108 L, como o menor aquário a considerar.", "brasil": "Aquarismo Paulista: ficha com 80x30 cm 'desejável'; em resposta a leitor (2026), sugeriu pelo menos 30 L com filtragem para 3 ou 4 espadas, e achou 8 peixes em 20 L acima do que o aquário suporta. Só um site brasileiro: ainda não é consenso.", "fonte_brasil": "Aquarismo Paulista — Peixe Espada (Xiphophorus hellerii), respostas a leitores (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Xiphophorus hellerii", "url": "https://www.seriouslyfish.com/species/xiphophorus-hellerii/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "tetra-negro",
      "nome_popular": "Tetra-negro",
      "artigo": "o",
      "outros_nomes": ["Tetra-preto", "Viuvinha"],
      "nome_cientifico": "Gymnocorymbus ternetzi",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 6, "max": 6 },
      "temperatura_c": [20, 26],
      "ph": [6.0, 7.0],
      "gh_dgh": [5, 20],
      "litragem_min_l": { "conservador": 68, "pratica_comum": 68, "observacao": "A fonte pede base de 75x30 cm (cerca de 68 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 12,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Em grupo pequeno, costuma beliscar nadadeiras.",
        "A fonte pede cardume de pelo menos 12.",
        "Cuidado com peixes de nadadeira longa, como betta e guppy."
      ],
      "popular_x_fonte": [
        { "popular": "Tetra-negro é briguento.", "fonte_diz": "A fonte diz que é pacífico; a fama de beliscar costuma sumir com 12 ou mais no cardume." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 75x30 cm, cerca de 68 L.", "brasil": "Aquarismo Paulista: ficha com 54 L (60x30x30 cm). Em 27 L, com 4 tetras, disse que as mordidas tendem a piorar no espaço pequeno.", "fonte_brasil": "Aquarismo Paulista — Tetra negro (Gymnocorymbus ternetzi) (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Gymnocorymbus ternetzi", "url": "https://www.seriouslyfish.com/species/gymnocorymbus-ternetzi/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "tetra-colombiano",
      "nome_popular": "Tetra-colombiano",
      "artigo": "o",
      "outros_nomes": ["Tetra colombiano", "Tetra azul-e-vermelho", "Tetra azul e vermelho", "Colombiano", "Colombian tetra", "Red and blue tetra", "Blue-red tetra", "Blue flame tetra", "Colombian red fin tetra", "Hyphessobrycon columbianus", "Hyphessobrycon colombianus"],
      "nome_cientifico": "Hyphessobrycon columbianus",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 6.5, "max": 6.5 },
      "temperatura_c": [20, 28],
      "ph": [5.0, 7.5],
      "gh_dgh": [1, 10],
      "litragem_min_l": { "conservador": 81, "pratica_comum": 60, "observacao": "Referência de fora (Seriously Fish): base de 90x30 cm (cerca de 81 L), por ser nadador ativo. Prática brasileira: Pró-Aquarista e Aqua Stuchi indicam 60 L para um cardume pequeno, e o Aquarismo Paulista pede 60 cm de comprimento. A RSDiscus pede 100 L. Mantenha o grupo (6 ou mais) e espaço para nadar." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["guppy", "betta"],
      "notas": [
        "Peixe de cardume: a fonte pede um grupo misto de pelo menos 8 a 10.",
        "Nadador rápido: evite peixes lentos de nadadeira longa (a Practical Fishkeeping cita o guppy de fantasia). Há relatos de beliscar nadadeiras, sobretudo com só 1 ou 2 no aquário.",
        "Cores mais fortes em aquário bem montado e plantado."
      ],
      "popular_x_fonte": [
        { "popular": "Tetra-colombiano é briguento.", "fonte_diz": "A Seriously Fish o chama de 'em geral pacífico'. A Practical Fishkeeping registra relatos de perseguição e beliscões, mais comuns quando há só 1 ou 2 no aquário." },
        { "popular": "Tetra é peixe pequeno, qualquer aquário serve.", "fonte_diz": "Ele chega a 6,5 cm e nada muito: a Seriously Fish pede base de 90x30 cm, cerca de 81 L." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 90x30 cm, cerca de 81 L.", "brasil": "Pró-Aquarista: 60 L, grupo de 3 ou mais. Aqua Stuchi: 60 L 'para um pequeno cardume', grupo de 6 ou mais. Aquarismo Paulista: pelo menos 60 cm de comprimento. RSDiscus: 100 L, grupo de 6.", "fonte_brasil": "Pró-Aquarista, Aqua Stuchi, Aquarismo Paulista, RSDiscus (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hyphessobrycon columbianus", "url": "https://www.seriouslyfish.com/species/hyphessobrycon-columbianus/" },
        { "titulo": "Practical Fishkeeping — Colombian redfin tetra (2009)", "url": "https://www.practicalfishkeeping.co.uk/features/colombian-redfin-tetra-hyphessobrycon-colombianus/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "paulistinha",
      "nome_popular": "Paulistinha",
      "artigo": "o",
      "outros_nomes": ["Zebrafish", "Danio-zebra", "Danio"],
      "nome_cientifico": "Danio rerio",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 5, "max": 5 },
      "temperatura_c": [18, 25],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 20],
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "A fonte pede base de 90x30 cm (cerca de 81 L): é um peixe que nada muito." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Nadador ativo: precisa de aquário comprido.",
        "A fonte pede grupo de 8 a 10.",
        "Aceita água mais fresca (18 a 25 °C)."
      ],
      "popular_x_fonte": [
        { "popular": "Paulistinha cabe em aquário bem pequeno.", "fonte_diz": "A Seriously Fish pede base de 90x30 cm, cerca de 81 L." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 90x30 cm, cerca de 81 L.", "brasil": "Aquarismo Paulista: a ficha pede 96 L (80x30x40 cm), mas, em resposta a leitor, disse que o mínimo para uns 6 paulistinhas é 40 L com filtro. O próprio site diz que a litragem da ficha é uma referência, sem base científica.", "fonte_brasil": "Aquarismo Paulista — Paulistinha (Danio rerio) (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Danio rerio", "url": "https://www.seriouslyfish.com/species/danio-rerio/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "cardinal",
      "nome_popular": "Cardinal",
      "artigo": "o",
      "outros_nomes": ["Tetra-cardinal", "Neon-cardinal"],
      "nome_cientifico": "Paracheirodon axelrodi",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 3.5, "max": 3.5 },
      "temperatura_c": [23, 29],
      "ph": [3.5, 7.5],
      "gh_dgh": [1, 12],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A fonte pede base de 60x30 cm (cerca de 54 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Peixe de cardume: a fonte pede 8 a 10 juntos.",
        "Gosta de água mais quente (23 a 29 °C) e mole.",
        "Peixes selvagens preferem água mais ácida."
      ],
      "popular_x_fonte": [
        { "popular": "Neon e cardinal são o mesmo peixe.", "fonte_diz": "São espécies diferentes, e o cardinal pede água mais quente (23 a 29 °C contra 21 a 25 °C do neon)." }
      ],
      "internacional_x_brasil": [
        { "tema": "Frio", "internacional": "Seriously Fish: manutenção de 23 a 29 °C.", "brasil": "INPA (Oliveira et al. 2008, Acta Amazonica): em teste de 96 h, metade dos cardinais morreu a 19,6 °C. Os autores apontam o frio como risco, sobretudo no transporte. Isso é limite letal, não faixa de manutenção.", "fonte_brasil": "Oliveira et al. 2008 — Acta Amazonica 38(4)" },
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L.", "brasil": "Aquarismo Paulista, Fazenda Submersa e Aqua Stuchi: 54 L (60x30x30 cm), com cardume de pelo menos 10. A Pró-Aquarista fala em 40 L para aquário plantado. Só uma loja dá número menor: ainda não é consenso.", "fonte_brasil": "Aquarismo Paulista, Fazenda Submersa, Aqua Stuchi, Pró-Aquarista (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Oliveira et al. 2008 — Tolerance to temperature, pH, ammonia and nitrite in cardinal tetra (Acta Amazonica 38(4); INPA, estudo brasileiro)", "url": "https://www.scielo.br/j/aa/a/FYCZj6tsgyvP9QcXYh7yPnC/?lang=en" },
        { "titulo": "Seriously Fish — Paracheirodon axelrodi", "url": "https://www.seriouslyfish.com/species/paracheirodon-axelrodi/" }
      ],
      "validado_ceo": true,
      "ilustracao": "02-visual/ilustracoes-especies/cardinal-ilustracao-04.png"
    },
    {
      "id": "disco",
      "nome_popular": "Disco",
      "artigo": "o",
      "outros_nomes": ["Acará-disco", "Discus"],
      "nome_cientifico": "Symphysodon aequifasciatus",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 14, "max": 14 },
      "temperatura_c": [26, 30],
      "ph": [5.0, 7.0],
      "gh_dgh": [0, 5],
      "litragem_min_l": { "conservador": 255, "pratica_comum": 255, "observacao": "A fonte pede 120x45x45 cm (cerca de 255 L) para alguns jovens ou um casal; a altura importa." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 5,
      "zona": "meio",
      "dieta": "insetivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["barbo-sumatra"],
      "notas": [
        "Vive em grupo: o FishBase fala em 5 ou mais.",
        "Muito tímido: precisa de abrigo e companheiros calmos.",
        "Pede água quente (26 a 30 °C), mole e estável."
      ],
      "popular_x_fonte": [
        { "popular": "Disco é o rei do aquário: compre um e coloque no centro.", "fonte_diz": "Vive em cardume; o FishBase recomenda grupos de 5 ou mais, e a Seriously Fish diz que é muito tímido." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: 120x45x45 cm, cerca de 255 L, para alguns jovens ou um casal.", "brasil": "Aquarismo Paulista: ficha com 200 L (100x40x50 cm); para um casal formado, aceita 200 L, e fora disso pede 4 ou 5 discos, porque vivem em grupo.", "fonte_brasil": "Aquarismo Paulista — Acará disco (Symphysodon aequifasciatus) (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Symphysodon aequifasciatus", "url": "https://www.seriouslyfish.com/species/symphysodon-aequifasciatus/" },
        { "titulo": "FishBase — Symphysodon aequifasciatus", "url": "https://www.fishbase.se/summary/Symphysodon-aequifasciatus.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "peixe-papagaio",
      "nome_popular": "Peixe-papagaio",
      "artigo": "o",
      "outros_nomes": ["Blood parrot", "Papagaio", "Parrot"],
      "nome_cientifico": "Híbrido (Amphilophus citrinellus x Vieja melanurus, origem discutida)",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 20, "max": 20 },
      "temperatura_c": [24, 26],
      "ph": [7.0, 8.0],
      "gh_dgh": [9, 20],
      "litragem_min_l": { "conservador": 240, "pratica_comum": 114, "observacao": "Híbrido sem ficha técnica confiável. Conservador: 120x40x50 cm, a partir dos 120 cm de comprimento citados pela Aqualog (só vista no buscador). Prática comum: guias de loja falam em 30 galões (cerca de 114 L) para um peixe. Regra prática: validar." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "come",
      "nao_misturar_com": [],
      "notas": [
        "É um híbrido criado em cativeiro: não existe na natureza.",
        "A boca não fecha direito: prefira ração de grão pequeno.",
        "Faixas de água = parte comum das espécies que o originaram (regra prática)."
      ],
      "popular_x_fonte": [
        { "popular": "Papagaio é uma espécie como outra qualquer.", "fonte_diz": "É um híbrido de ciclídeos; não há ficha técnica própria, então as faixas aqui são estimadas a partir das espécies de origem." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Guias de loja de fora: cerca de 30 galões (114 L) para um peixe. Conservador: 120x40x50 cm (cerca de 240 L).", "brasil": "As lojas brasileiras pedem mais que a prática de fora: RSDiscus, 200 L para um peixe ou um casal e 300 L ou mais no comunitário; Pró-Aquarista, 200 L; Aqua Stuchi, 200 L ou mais para adultos.", "fonte_brasil": "RSDiscus, Pró-Aquarista, Aqua Stuchi (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Amphilophus citrinellus (espécie de origem)", "url": "https://www.seriouslyfish.com/species/amphilophus-citrinellus/" },
        { "titulo": "FishBase — Vieja melanurus (espécie de origem)", "url": "https://www.fishbase.se/summary/Vieja-melanura.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "tricogaster",
      "nome_popular": "Tricogaster",
      "artigo": "o",
      "outros_nomes": ["Gurami-azul", "Tricogaster-azul", "Gurami-de-três-pintas"],
      "nome_cientifico": "Trichopodus trichopterus",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 15, "max": 15 },
      "temperatura_c": [24, 30],
      "ph": [5.5, 8.5],
      "gh_dgh": [3, 35],
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "A fonte pede base de 90x30 cm (cerca de 81 L). Sem divergência registrada." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["betta"],
      "notas": [
        "Machos brigam entre si, mais ainda na reprodução.",
        "Alguns ficam briguentos ao crescer; outros seguem calmos.",
        "Respira ar: deixe espaço entre a água e a tampa."
      ],
      "popular_x_fonte": [
        { "popular": "Tricogaster é tranquilo para qualquer comunitário.", "fonte_diz": "A Seriously Fish o classifica como territorial e sugere companheiros robustos." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 90x30 cm, cerca de 81 L.", "brasil": "O Brasil pede igual ou mais: Aquarismo Paulista, ficha com 96 L (80x30x40 cm) e, a um leitor com dois tricogasters em 20 L, 'pelo menos uns 100 L'. Lojas brasileiras falam em 80 a 100 L para o tricogaster (Pró-Aquarista, Aqua Stuchi, RSDiscus).", "fonte_brasil": "Aquarismo Paulista — Trichogaster trichopterus; lojas (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichopodus trichopterus", "url": "https://www.seriouslyfish.com/species/trichopodus-trichopterus/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "colisa-lalia",
      "nome_popular": "Colisa-lalia",
      "artigo": "a",
      "outros_nomes": ["Colisa", "Colisa lalia", "Lalia", "Gurami-anão", "Gurami anão", "Dwarf gourami", "Trichogaster lalius", "Robin"],
      "nome_cientifico": "Trichogaster lalius",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 8.8, "max": 8.8 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 7.5],
      "gh_dgh": [2, 18],
      "litragem_min_l": { "conservador": 56, "pratica_comum": 40, "observacao": "Referência de fora (Seriously Fish): 60x30x30 cm (cerca de 56 L) mal basta para um casal. Prática brasileira: lojas especializadas (Pró-Aquarista, Aquafam) indicam 40 L, e o Aquarismo Paulista aceita uma colisa só em cerca de 44 L; outras lojas pedem 60 L (Aqua Stuchi) e 70 L (RSDiscus). Os 40 L valem para um macho só. Dois machos, só em aquário muito grande." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["betta", "guppy"],
      "companhia": { "cor": "amarelo", "aceita": ["rasbora", "neon", "cardinal", "tetra-negro", "tetra-colombiano", "coridora-bronze", "coridora-pimenta"], "texto": "A fonte só recomenda a colisa-lalia com reserva para o comunitário: é tímida e territorial e, em aquário pequeno, deve ser o peixe principal. Ela cita rasboras, tetras e coridoras como companhia; outros guramis, só em aquário grande." },
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "Dois machos juntos dão briga: a fonte só aceita em aquário muito grande. Betta, outros anabantídeos e peixes vistosos como o guppy podem deixar o macho muito agressivo.",
        "Há um vírus que aparece em lalias importadas (iridovírus do gurami-anão, DGIV): a Seriously Fish diz que é muito contagioso, passa para outros peixes pela água e até hoje não tem tratamento. Compre de fornecedor confiável e mantenha os peixes novos em quarentena antes de juntar.",
        "Variedades de cor (neon blue, vermelha/sunset) pedem o mesmo cuidado da forma natural."
      ],
      "popular_x_fonte": [
        { "popular": "Colisa é tranquila para qualquer comunitário.", "fonte_diz": "A Seriously Fish dá uma recomendação 'com reserva' para o comunitário: é tímida, territorial e, em aquário pequeno, deve ser o peixe principal." },
        { "popular": "Dá para ter dois machos de colisa no mesmo aquário.", "fonte_diz": "A Seriously Fish diz que dois machos são 'receita para desastre', a não ser em aquário muito grande." },
        { "popular": "Colisa e betta combinam, são parentes.", "fonte_diz": "A Seriously Fish avisa que outros anabantídeos, incluindo o betta, podem deixar o macho de colisa muito agressivo." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: 60x30x30 cm (cerca de 56 L) mal basta para um casal.", "brasil": "Lojas e sites brasileiros variam de 40 a 70 L: 40 L (Pró-Aquarista, Aquafam), 60 L (Aqua Stuchi), 70 L (RSDiscus). O Aquarismo Paulista dá 56 L na ficha, mas em resposta a leitores aceita uma colisa em 44 a 60 L e desaconselha casal ou trio abaixo de uns 40 L.", "fonte_brasil": "Pró-Aquarista; Aquafam; Aqua Stuchi; RSDiscus; Aquarismo Paulista (prática brasileira, lojas e site)" },
        { "tema": "No Brasil", "internacional": "Vendida no mundo todo como 'dwarf gourami'; boa parte vem de criadores da Ásia.", "brasil": "Um estudo brasileiro (dissertação da UFMG, 2025) trata a colisa-lalia como espécie de valor econômico na piscicultura ornamental do país e popular entre aquaristas; ele mediu a toxicidade da amônia e do nitrito nas larvas. (Visto pelo buscador; o PDF não abriu.)", "fonte_brasil": "Sales, M. C. S. — Efeito agudo dos compostos nitrogenados, amônia e nitrito, na fase larval da Colisa lalia (Trichogaster lalius). Dissertação, Zootecnia, UFMG, 2025" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster lalius", "url": "https://www.seriouslyfish.com/species/trichogaster-lalius/" },
        { "titulo": "Go et al. 2006 (Molecular and Cellular Probes 20:212-222) e Go & Whittington 2006 (Aquaculture 258:140-149) — megalocitivírus do gurami-anão; resumo em Practical Fishkeeping", "url": "https://www.practicalfishkeeping.co.uk/fishkeeping-news/aquarium-trade-may-have-spread-gourami-virus/" },
        { "titulo": "Sales 2025 — dissertação UFMG sobre amônia e nitrito em larvas de Colisa lalia (via buscador)", "url": "https://repositorio.ufmg.br//bitstreams/1cc4c937-20bc-4087-aef1-db2a866aa3d9/download" },
        { "titulo": "Pró-Aquarista — Colisa lália (prática brasileira, loja)", "url": "https://www.proaquarista.com.br/produto/colisa-lalia-trichogaster-lalius.html" },
        { "titulo": "Aquarismo Paulista — Colisa lalia, ficha e respostas a leitores (prática brasileira)", "url": "https://www.aquarismopaulista.com/trichogaster-lalius/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "colisa-sunset",
      "nome_popular": "Colisa-sunset",
      "artigo": "a",
      "outros_nomes": ["Colisa sunset", "Lalia sunset", "Colisa vermelha", "Lalia vermelho", "Lalia red", "Colisa coral", "Trichogaster lalius", "Gurami-anão", "Dwarf gourami"],
      "nome_cientifico": "Trichogaster lalius",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 8.8, "max": 8.8 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 7.5],
      "gh_dgh": [2, 18],
      "litragem_min_l": { "conservador": 56, "pratica_comum": 40, "observacao": "Referência de fora (Seriously Fish): 60x30x30 cm (cerca de 56 L) mal basta para um casal. Prática brasileira: lojas especializadas (Pró-Aquarista, Aquafam) indicam 40 L, e o Aquarismo Paulista aceita uma colisa só em cerca de 44 L; outras lojas pedem 60 L (Aqua Stuchi) e 70 L (RSDiscus). Os 40 L valem para um macho só. Dois machos, só em aquário muito grande." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["betta", "guppy"],
      "companhia": { "cor": "amarelo", "aceita": ["rasbora", "neon", "cardinal", "tetra-negro", "tetra-colombiano", "coridora-bronze", "coridora-pimenta"], "texto": "A fonte só recomenda a colisa-lalia com reserva para o comunitário: é tímida e territorial e, em aquário pequeno, deve ser o peixe principal. Ela cita rasboras, tetras e coridoras como companhia; outros guramis, só em aquário grande." },
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "Dois machos juntos dão briga: a fonte só aceita em aquário muito grande. Betta, outros anabantídeos e peixes vistosos como o guppy podem deixar o macho muito agressivo.",
        "Há um vírus que aparece em lalias importadas (iridovírus do gurami-anão, DGIV): a Seriously Fish diz que é muito contagioso, passa para outros peixes pela água e até hoje não tem tratamento. Compre de fornecedor confiável e mantenha os peixes novos em quarentena antes de juntar.",
        "Colisa-sunset (vermelha/coral) é uma variedade de cor criada da colisa-lalia (Trichogaster lalius): mesmos valores, cuidados e fontes da ficha da colisa-lalia. Misturar com outras lalias conta como a mesma espécie: um macho só."
      ],
      "popular_x_fonte": [
        { "popular": "Colisa é tranquila para qualquer comunitário.", "fonte_diz": "A Seriously Fish dá uma recomendação 'com reserva' para o comunitário: é tímida, territorial e, em aquário pequeno, deve ser o peixe principal." },
        { "popular": "Dá para ter dois machos de colisa no mesmo aquário.", "fonte_diz": "A Seriously Fish diz que dois machos são 'receita para desastre', a não ser em aquário muito grande." },
        { "popular": "Colisa e betta combinam, são parentes.", "fonte_diz": "A Seriously Fish avisa que outros anabantídeos, incluindo o betta, podem deixar o macho de colisa muito agressivo." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: 60x30x30 cm (cerca de 56 L) mal basta para um casal.", "brasil": "Lojas e sites brasileiros variam de 40 a 70 L: 40 L (Pró-Aquarista, Aquafam), 60 L (Aqua Stuchi), 70 L (RSDiscus). O Aquarismo Paulista dá 56 L na ficha, mas em resposta a leitores aceita uma colisa em 44 a 60 L e desaconselha casal ou trio abaixo de uns 40 L.", "fonte_brasil": "Pró-Aquarista; Aquafam; Aqua Stuchi; RSDiscus; Aquarismo Paulista (prática brasileira, lojas e site)" },
        { "tema": "No Brasil", "internacional": "Vendida no mundo todo como 'dwarf gourami'; boa parte vem de criadores da Ásia.", "brasil": "Um estudo brasileiro (dissertação da UFMG, 2025) trata a colisa-lalia como espécie de valor econômico na piscicultura ornamental do país e popular entre aquaristas; ele mediu a toxicidade da amônia e do nitrito nas larvas. (Visto pelo buscador; o PDF não abriu.)", "fonte_brasil": "Sales, M. C. S. — Efeito agudo dos compostos nitrogenados, amônia e nitrito, na fase larval da Colisa lalia (Trichogaster lalius). Dissertação, Zootecnia, UFMG, 2025" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster lalius", "url": "https://www.seriouslyfish.com/species/trichogaster-lalius/" },
        { "titulo": "Go et al. 2006 (Molecular and Cellular Probes 20:212-222) e Go & Whittington 2006 (Aquaculture 258:140-149) — megalocitivírus do gurami-anão; resumo em Practical Fishkeeping", "url": "https://www.practicalfishkeeping.co.uk/fishkeeping-news/aquarium-trade-may-have-spread-gourami-virus/" },
        { "titulo": "Sales 2025 — dissertação UFMG sobre amônia e nitrito em larvas de Colisa lalia (via buscador)", "url": "https://repositorio.ufmg.br//bitstreams/1cc4c937-20bc-4087-aef1-db2a866aa3d9/download" },
        { "titulo": "Pró-Aquarista — Colisa lália (prática brasileira, loja)", "url": "https://www.proaquarista.com.br/produto/colisa-lalia-trichogaster-lalius.html" },
        { "titulo": "Aquarismo Paulista — Colisa lalia, ficha e respostas a leitores (prática brasileira)", "url": "https://www.aquarismopaulista.com/trichogaster-lalius/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "colisa-azul",
      "nome_popular": "Colisa-azul",
      "artigo": "a",
      "outros_nomes": ["Colisa azul", "Lalia azul", "Colisa neon blue", "Lalia neon blue", "Lalia neon", "Trichogaster lalius", "Gurami-anão", "Dwarf gourami"],
      "nome_cientifico": "Trichogaster lalius",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 8.8, "max": 8.8 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 7.5],
      "gh_dgh": [2, 18],
      "litragem_min_l": { "conservador": 56, "pratica_comum": 40, "observacao": "Referência de fora (Seriously Fish): 60x30x30 cm (cerca de 56 L) mal basta para um casal. Prática brasileira: lojas especializadas (Pró-Aquarista, Aquafam) indicam 40 L, e o Aquarismo Paulista aceita uma colisa só em cerca de 44 L; outras lojas pedem 60 L (Aqua Stuchi) e 70 L (RSDiscus). Os 40 L valem para um macho só. Dois machos, só em aquário muito grande." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["betta", "guppy"],
      "companhia": { "cor": "amarelo", "aceita": ["rasbora", "neon", "cardinal", "tetra-negro", "tetra-colombiano", "coridora-bronze", "coridora-pimenta"], "texto": "A fonte só recomenda a colisa-lalia com reserva para o comunitário: é tímida e territorial e, em aquário pequeno, deve ser o peixe principal. Ela cita rasboras, tetras e coridoras como companhia; outros guramis, só em aquário grande." },
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "Dois machos juntos dão briga: a fonte só aceita em aquário muito grande. Betta, outros anabantídeos e peixes vistosos como o guppy podem deixar o macho muito agressivo.",
        "Há um vírus que aparece em lalias importadas (iridovírus do gurami-anão, DGIV): a Seriously Fish diz que é muito contagioso, passa para outros peixes pela água e até hoje não tem tratamento. Compre de fornecedor confiável e mantenha os peixes novos em quarentena antes de juntar.",
        "Colisa-azul (neon blue) é uma variedade de cor criada da colisa-lalia (Trichogaster lalius): mesmos valores, cuidados e fontes da ficha da colisa-lalia. Misturar com outras lalias conta como a mesma espécie: um macho só."
      ],
      "popular_x_fonte": [
        { "popular": "Colisa é tranquila para qualquer comunitário.", "fonte_diz": "A Seriously Fish dá uma recomendação 'com reserva' para o comunitário: é tímida, territorial e, em aquário pequeno, deve ser o peixe principal." },
        { "popular": "Dá para ter dois machos de colisa no mesmo aquário.", "fonte_diz": "A Seriously Fish diz que dois machos são 'receita para desastre', a não ser em aquário muito grande." },
        { "popular": "Colisa e betta combinam, são parentes.", "fonte_diz": "A Seriously Fish avisa que outros anabantídeos, incluindo o betta, podem deixar o macho de colisa muito agressivo." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: 60x30x30 cm (cerca de 56 L) mal basta para um casal.", "brasil": "Lojas e sites brasileiros variam de 40 a 70 L: 40 L (Pró-Aquarista, Aquafam), 60 L (Aqua Stuchi), 70 L (RSDiscus). O Aquarismo Paulista dá 56 L na ficha, mas em resposta a leitores aceita uma colisa em 44 a 60 L e desaconselha casal ou trio abaixo de uns 40 L.", "fonte_brasil": "Pró-Aquarista; Aquafam; Aqua Stuchi; RSDiscus; Aquarismo Paulista (prática brasileira, lojas e site)" },
        { "tema": "No Brasil", "internacional": "Vendida no mundo todo como 'dwarf gourami'; boa parte vem de criadores da Ásia.", "brasil": "Um estudo brasileiro (dissertação da UFMG, 2025) trata a colisa-lalia como espécie de valor econômico na piscicultura ornamental do país e popular entre aquaristas; ele mediu a toxicidade da amônia e do nitrito nas larvas. (Visto pelo buscador; o PDF não abriu.)", "fonte_brasil": "Sales, M. C. S. — Efeito agudo dos compostos nitrogenados, amônia e nitrito, na fase larval da Colisa lalia (Trichogaster lalius). Dissertação, Zootecnia, UFMG, 2025" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster lalius", "url": "https://www.seriouslyfish.com/species/trichogaster-lalius/" },
        { "titulo": "Go et al. 2006 (Molecular and Cellular Probes 20:212-222) e Go & Whittington 2006 (Aquaculture 258:140-149) — megalocitivírus do gurami-anão; resumo em Practical Fishkeeping", "url": "https://www.practicalfishkeeping.co.uk/fishkeeping-news/aquarium-trade-may-have-spread-gourami-virus/" },
        { "titulo": "Sales 2025 — dissertação UFMG sobre amônia e nitrito em larvas de Colisa lalia (via buscador)", "url": "https://repositorio.ufmg.br//bitstreams/1cc4c937-20bc-4087-aef1-db2a866aa3d9/download" },
        { "titulo": "Pró-Aquarista — Colisa lália (prática brasileira, loja)", "url": "https://www.proaquarista.com.br/produto/colisa-lalia-trichogaster-lalius.html" },
        { "titulo": "Aquarismo Paulista — Colisa lalia, ficha e respostas a leitores (prática brasileira)", "url": "https://www.aquarismopaulista.com/trichogaster-lalius/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "colisa-chuna",
      "nome_popular": "Colisa-chuna",
      "artigo": "a",
      "outros_nomes": ["Colisa chuna", "Chuna", "Gurami-mel", "Gurami mel", "Colisa mel", "Honey gourami", "Trichogaster chuna", "Colisa sota", "Colisa gold", "Chuna gold", "Gurami-mel dourado", "Red honey", "Chuna red", "Chuna vermelha", "Chuna sunset"],
      "nome_cientifico": "Trichogaster chuna",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 5.5, "max": 5.5 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 7.5],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A Seriously Fish pede base de 60x30 cm (cerca de 54 L) para um casal ou um grupo pequeno. Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 4,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["barbo-sumatra"],
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "Calma e lenta: a fonte pede companheiros pacíficos e deixar de fora espécies territoriais ou agressivas.",
        "A fonte recomenda um grupo de 4 a 6: os dominantes afastam os outros na hora da comida, mas a espécie precisa da companhia das iguais.",
        "As formas gold, red e sunset são de criação e pedem o mesmo cuidado da forma natural."
      ],
      "popular_x_fonte": [
        { "popular": "Gurami-mel pode viver sozinho.", "fonte_diz": "A Seriously Fish recomenda um grupo de 4 a 6, porque a espécie 'parece precisar' da interação com outras da mesma espécie." },
        { "popular": "A colisa gold (ou red honey) é outra espécie.", "fonte_diz": "A Seriously Fish diz que 'red', 'sunset' e 'golden' são linhagens de criação da mesma espécie, com cuidado idêntico." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster chuna", "url": "https://www.seriouslyfish.com/species/trichogaster-chuna/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "colisa-labiosa",
      "nome_popular": "Colisa-labiosa",
      "artigo": "a",
      "outros_nomes": ["Colisa labiosa", "Labiosa", "Gurami-de-lábio-grosso", "Gurami de lábio grosso", "Gurami lábio grosso", "Thick-lipped gourami", "Trichogaster labiosa", "Colisa labiosus", "Labiosa gold", "Labiosa sunset", "Labiosa vermelha", "Colisa labiosa dourada"],
      "nome_cientifico": "Trichogaster labiosa",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 10, "max": 10 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 7.5],
      "gh_dgh": [5, 15],
      "litragem_min_l": { "conservador": 67, "pratica_comum": 67, "observacao": "A Seriously Fish pede base de 74x30 cm (cerca de 67 L). Sem divergência registrada." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["colisa-fasciata"],
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "Não junte com a colisa-fasciata: a fonte diz que as duas cruzam livremente entre si (híbridos).",
        "Tímida e lenta: precisa de plantas e esconderijo, e de pouca correnteza.",
        "A forma gold (sunset) é de criação; nela, a fêmea é quase tão colorida quanto o macho."
      ],
      "popular_x_fonte": [
        { "popular": "Toda colisa é igual e pode ficar junta.", "fonte_diz": "A Seriously Fish diz que a labiosa e a fasciata cruzam livremente e pede para não juntar as duas." },
        { "popular": "Colisa é peixe pequeno, cabe em qualquer aquário.", "fonte_diz": "A labiosa chega a 10 cm (comprimento padrão) e a Seriously Fish pede base de 74x30 cm, cerca de 67 L." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 74x30 cm, cerca de 67 L.", "brasil": "Mesma faixa no Brasil: Aquarismo Paulista, 72 L (80x30x30 cm); RSDiscus, 70 L.", "fonte_brasil": "Aquarismo Paulista, RSDiscus (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster labiosa", "url": "https://www.seriouslyfish.com/species/trichogaster-labiosa/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "colisa-fasciata",
      "nome_popular": "Colisa-fasciata",
      "artigo": "a",
      "outros_nomes": ["Colisa fasciata", "Colisa fasciatus", "Fasciata", "Gurami-listrado", "Gurami listrado", "Colisa listrada", "Banded gourami", "Trichogaster fasciata"],
      "nome_cientifico": "Trichogaster fasciata",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 10, "max": 10 },
      "temperatura_c": [21, 28],
      "ph": [6.0, 7.5],
      "gh_dgh": [5, 15],
      "litragem_min_l": { "conservador": 71, "pratica_comum": 71, "observacao": "A Seriously Fish diz que 75x30x30 cm (cerca de 71 L) basta para um casal." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["colisa-labiosa"],
      "notas": [
        "Nome: o gênero antigo Colisa hoje se chama Trichogaster. O 'tricogaster' de loja (gurami-azul, três-pintas) é outro gênero, Trichopodus, e chega a 15 cm.",
        "É a maior do gênero (até 10 cm). Machos brigam entre si em aquário pequeno, e ela pode ficar um pouco agressiva na desova.",
        "Não junte com a colisa-labiosa: a fonte diz que as duas cruzam entre si (híbridos).",
        "Aquário calmo, bem plantado, com plantas flutuantes e pouca correnteza."
      ],
      "popular_x_fonte": [
        { "popular": "Toda colisa é anã.", "fonte_diz": "A fasciata é a maior do gênero: chega a 10 cm (comprimento padrão), e a Seriously Fish pede cerca de 71 L para um casal." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trichogaster fasciata", "url": "https://www.seriouslyfish.com/species/trichogaster-fasciata/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "mbuna",
      "nome_popular": "Mbuna zebra",
      "artigo": "o",
      "outros_nomes": ["Mbuna", "Ciclídeo africano", "Ciclídeo do Malawi", "Zebra", "Pseudotropheus zebra", "Metriaclima zebra"],
      "nome_cientifico": "Maylandia zebra",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 15, "max": 15 },
      "temperatura_c": [22, 28],
      "ph": [7.6, 8.6],
      "gh_dgh": [10, 25],
      "litragem_min_l": { "conservador": 205, "pratica_comum": 205, "observacao": "A fonte pede base de 120x38 cm (cerca de 205 L). Abaixo de 200 L, só um macho." },
      "temperamento": "agressivo",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 4,
      "zona": "meio",
      "dieta": "herbivoro",
      "come_peixes_pequenos": false,
      "plantas": "come",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "companhia": { "cor": "vermelho", "aceita": ["mbuna-yellow"], "texto": "A fonte diz que o mbuna zebra não serve de modo algum para o aquário tropical comum: só em aquário de ciclídeos do Lago Malawi, e longe dos mbunas mais mansos." },
      "notas": [
        "Um macho para pelo menos três fêmeas.",
        "Não serve para comunitário tropical comum: água alcalina e muita briga.",
        "Base da dieta é vegetal; nada de carne vermelha."
      ],
      "popular_x_fonte": [
        { "popular": "Ciclídeo africano vai bem com qualquer peixe colorido.", "fonte_diz": "A Seriously Fish diz que não serve de modo algum para o aquário tropical comum." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Maylandia zebra", "url": "https://www.seriouslyfish.com/species/maylandia-zebra/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "mbuna-yellow",
      "nome_popular": "Mbuna yellow",
      "artigo": "o",
      "outros_nomes": ["Labidochromis yellow", "Ciclídeo amarelo", "Electric yellow", "Labidochromis caeruleus"],
      "nome_cientifico": "Labidochromis caeruleus",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 10, "max": 10 },
      "temperatura_c": [24, 28],
      "ph": [7.7, 8.6],
      "gh_dgh": [10, 25],
      "litragem_min_l": { "conservador": 154, "pratica_comum": 154, "observacao": "A fonte pede base de 90x45 cm (cerca de 154 L). Não achamos prática comum com fonte." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 4,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "come",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "companhia": { "cor": "amarelo", "aceita": ["mbuna"], "texto": "A fonte recomenda o yellow, de preferência, em aquário de ciclídeos do Lago Malawi; fora dele, só com peixes de água dura e alcalina (ela cita alguns arco-íris e ciprinídeos). Num comunitário tropical comum, é exceção." },
      "notas": [
        "Um dos mbunas mais calmos, mas fica territorial na desova.",
        "Um macho para pelo menos três fêmeas.",
        "Água alcalina e dura: não serve para o comunitário tropical comum."
      ],
      "popular_x_fonte": [
        { "popular": "Todo ciclídeo africano é igualmente bravo.", "fonte_diz": "A Seriously Fish chama o yellow de relativamente pacífico 'para um mbuna'; o zebra é dos mais agressivos." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 90x45 cm, cerca de 154 L.", "brasil": "Mesma faixa no Brasil: Pró-Aquarista, 150 L; RSDiscus, 150 L ou 100 cm de comprimento para um harém, e 200 a 250 L em outra ficha da mesma loja.", "fonte_brasil": "Pró-Aquarista, RSDiscus (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Labidochromis caeruleus", "url": "https://www.seriouslyfish.com/species/labidochromis-caeruleus/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "barbo-sumatra",
      "nome_popular": "Barbo-sumatra",
      "artigo": "o",
      "outros_nomes": ["Barbo-tigre", "Barbus"],
      "nome_cientifico": "Puntigrus tetrazona",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 6, "max": 6 },
      "temperatura_c": [20, 26],
      "ph": [5.0, 8.0],
      "gh_dgh": [1, 20],
      "litragem_min_l": { "conservador": 72, "pratica_comum": 72, "observacao": "A fonte pede base de 80x30 cm (cerca de 72 L). Sem divergência registrada." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["guppy", "kinguio", "betta", "acara-bandeira", "disco", "ramirezi", "colisa-chuna"],
      "notas": [
        "Famoso por morder nadadeiras, sobretudo em grupo pequeno.",
        "Evite peixes lentos, tímidos ou de nadadeira longa.",
        "A fonte pede grupo de 8 a 10."
      ],
      "popular_x_fonte": [
        { "popular": "Barbo é briguento de qualquer jeito.", "fonte_diz": "A Seriously Fish diz que a agressividade aparece mais com poucos peixes ou pouco espaço." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 80x30 cm, cerca de 72 L.", "brasil": "Lojas brasileiras ficam na mesma faixa: RSDiscus 60 a 80 L, Aqua Stuchi 80 L, Fazenda Submersa 60x30 cm, mas 80 cm de comprimento no comunitário. Todas pedem cardume de 8 a 10 para diminuir as mordidas.", "fonte_brasil": "RSDiscus, Aqua Stuchi, Fazenda Submersa (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Puntigrus tetrazona", "url": "https://www.seriouslyfish.com/species/puntigrus-tetrazona/" },
        { "titulo": "Seriously Fish — Poecilia reticulata (evitar barbo-tigre)", "url": "https://www.seriouslyfish.com/species/poecilia-reticulata/" },
        { "titulo": "RSPCA Austrália — cuidados com o peixe-dourado (barbo-tigre x kinguio de nadadeira longa)", "url": "https://kb.rspca.org.au/knowledge-base/how-should-i-keep-and-care-for-my-goldfish/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "ramirezi",
      "nome_popular": "Ramirezi",
      "artigo": "o",
      "outros_nomes": ["Ciclídeo-borboleta", "Ram"],
      "nome_cientifico": "Mikrogeophagus ramirezi",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 4, "max": 4 },
      "temperatura_c": [27, 30],
      "ph": [4.0, 7.0],
      "gh_dgh": [1, 10],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A fonte pede base de 60x30 cm (cerca de 54 L) para um casal." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 2,
      "zona": "fundo",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["barbo-sumatra"],
      "companhia": { "cor": "amarelo", "aceita": ["cardinal", "neon", "tetra-negro", "rasbora", "disco", "cascudo-zebra-l046"], "texto": "A fonte não recomenda o ramirezi para o comunitário em geral: pede água muito limpa e quente e perde a comida para peixes mais vivos. Recomenda cardumes de tetras pacíficos de meia-água e pede evitar peixes territoriais e a maioria dos outros ciclídeos." },
      "notas": [
        "Melhor em casal; machos rivais disputam território.",
        "Pede água quente (27 a 30 °C) e mole.",
        "Compete mal por comida com peixes agitados."
      ],
      "popular_x_fonte": [
        { "popular": "Ramirezi é ciclídeo-anão fácil para qualquer comunitário.", "fonte_diz": "A Seriously Fish não o recomenda para o comunitário em geral e pede 27 a 30 °C." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L, para um casal.", "brasil": "Lojas brasileiras divergem: Fazenda Submersa, 30 L só para um casal e 50 L no comunitário; RSDiscus, 40 a 60 L para um casal; Pró-Aquarista, 50 L; Aqua Stuchi, 60 L para um casal. Não há consenso abaixo dos 54 L.", "fonte_brasil": "Fazenda Submersa, RSDiscus, Pró-Aquarista, Aqua Stuchi (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Mikrogeophagus ramirezi", "url": "https://www.seriouslyfish.com/species/mikrogeophagus-ramirezi/" }
      ],
      "validado_ceo": true,
      "ilustracao": "02-visual/ilustracoes-especies/ramirezi-ilustracao-06.png"
    },
    {
      "id": "rasbora",
      "nome_popular": "Rasbora-arlequim",
      "artigo": "a",
      "outros_nomes": ["Rasbora", "Arlequim"],
      "nome_cientifico": "Trigonostigma heteromorpha",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 4.5, "max": 4.5 },
      "temperatura_c": [21, 28],
      "ph": [5.0, 7.5],
      "gh_dgh": [1, 12],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 40, "observacao": "Referência de fora (Seriously Fish): base de 60x30 cm (cerca de 54 L). Prática brasileira: RSDiscus e Pró-Aquarista indicam 40 L, para grupos a partir de 5 (RSDiscus) ou 3 (Pró-Aquarista). Para o cardume de 8 a 10 que a fonte de fora pede (a Fazenda Submersa pede 10), os 54 L dão mais conforto." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 8,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Muito pacífica: a fonte pede grupo de 8 a 10.",
        "Pequena: vira comida de peixes grandes.",
        "Gosta de aquário plantado e água mole."
      ],
      "popular_x_fonte": [
        { "popular": "Rasbora é peixe de cardume pequeno, 3 ou 4 bastam.", "fonte_diz": "A Seriously Fish diz que deve ficar em grupo de pelo menos 8 a 10." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 60x30 cm, cerca de 54 L.", "brasil": "RSDiscus: 40 L, grupo de pelo menos 5. Pró-Aquarista: 40 L, grupo de pelo menos 3. Fazenda Submersa: cardume de pelo menos 10, sem número de litros.", "fonte_brasil": "RSDiscus, Pró-Aquarista, Fazenda Submersa (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Trigonostigma heteromorpha", "url": "https://www.seriouslyfish.com/species/trigonostigma-heteromorpha/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "coridora-pimenta",
      "nome_popular": "Coridora-pimenta",
      "artigo": "a",
      "outros_nomes": ["Coridora-paleatus", "Corydoras paleatus"],
      "nome_cientifico": "Hoplisoma paleatum",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 7, "max": 7 },
      "temperatura_c": [22, 26],
      "ph": [6.0, 7.0],
      "gh_dgh": [0, 12],
      "litragem_min_l": { "conservador": 70, "pratica_comum": 60, "observacao": "Referência de fora (Seriously Fish): base de 61x38 cm (cerca de 70 L). Prática brasileira: Aqua Stuchi, Pró-Aquarista e RSDiscus (adultos) indicam 60 L, e o Aquarismo Paulista, 54 L (60x30x30 cm). Sempre em grupo: 5 a 6 ou mais." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 6,
      "zona": "fundo",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "notas": [
        "Precisa viver em grupo (a fonte não dá número; usamos 6, como na coridora-bronze).",
        "Prefere água mais fresca que muitos tropicais (22 a 26 °C).",
        "Dê ração de fundo: não vive de restos."
      ],
      "popular_x_fonte": [
        { "popular": "Coridora é peixe de limpeza.", "fonte_diz": "É onívora e aceita ração de fundo; a fonte recomenda alimentá-la de propósito." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 61x38 cm, cerca de 70 L.", "brasil": "Aqua Stuchi: 60 L, grupo de 5 a 6. Pró-Aquarista: 60 L, grupo de 3 ou mais. RSDiscus: 60 L para adultos. Aquarismo Paulista: 54 L (60x30x30 cm), grupo de 6.", "fonte_brasil": "Aqua Stuchi, Pró-Aquarista, RSDiscus, Aquarismo Paulista (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hoplisoma paleatum (antes Corydoras paleatus)", "url": "https://www.seriouslyfish.com/species/corydoras-paleatus/" }
      ],
      "validado_ceo": false,
      "ilustracao": "02-visual/ilustracoes-especies/coridora-pimenta-ilustracao-05.png"
    },
    {
      "id": "killifish-gardneri",
      "nome_popular": "Killifish gardneri",
      "artigo": "o",
      "outros_nomes": ["Killi", "Killifish", "Killi gardneri", "Gardneri", "Killi-gardneri", "Fundulopanchax gardneri", "Aphyosemion gardneri", "Steel-blue killifish", "Blue lyretail", "Gardneri nigerianus"],
      "nome_cientifico": "Fundulopanchax gardneri",
      "nivel": "iniciante",
      "tamanho_adulto_cm": { "tipico": 5.5, "max": 5.5 },
      "temperatura_c": [20, 26],
      "ph": [6.0, 7.5],
      "gh_dgh": [1, 10],
      "litragem_min_l": { "conservador": 38, "pratica_comum": 10, "observacao": "A Seriously Fish não dá litragem (só 'aquário pequeno'). Conservador: a American Killifish Association recomenda 10 galões (cerca de 38 L) ou mais para o aquário permanente. Prática comum: criadores de killi usam caixas de uma espécie só, às vezes de 2,5 galões (cerca de 10 L), com filtro de esponja e troca de água frequente." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 3,
      "zona": "meio",
      "dieta": "insetivoro",
      "dieta_detalhe": "Micropredador: come pequenos crustáceos, larvas e vermes. Aceita ração seca, mas a fonte pede alimento vivo ou congelado pequeno com frequência (artêmia, dáfnia, larva de mosquito).",
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "companhia": { "cor": "amarelo", "aceita": [], "texto": "A fonte diz que o killifish gardneri é robusto e pode viver com outros peixes, mas não serve para o comunitário comum: escolha os companheiros com cuidado. O mais comum entre criadores é um aquário só da espécie." },
      "notas": [
        "Killifish é um grupo com centenas de espécies; esta ficha é do gardneri (Fundulopanchax gardneri), um dos indicados para iniciantes pela American Killifish Association.",
        "Pula muito: tampa bem fechada, sem frestas.",
        "Machos brigam entre si: um macho para 2 ou 3 fêmeas e bastante esconderijo (plantas, musgo).",
        "Semi-anual (Seriously Fish): os ovos aguentam secar e eclodem quando voltam para a água, mas a seca não é obrigatória. Criadores mantêm separadas as formas de cada local (subespécies e populações)."
      ],
      "popular_x_fonte": [
        { "popular": "Killifish vive só alguns meses.", "fonte_diz": "A vida curta é das espécies anuais, como os Nothobranchius, cujos ovos precisam passar por uma seca. A Seriously Fish chama o gardneri de 'semi-anual', e a American Killifish Association explica que, em muitos Fundulopanchax, a seca não é necessária. As fontes abertas não dão a expectativa de vida do gardneri." },
        { "popular": "Killi não precisa de tampa.", "fonte_diz": "A Seriously Fish o chama de 'saltador prodigioso' e pede tampa bem ajustada." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "American Killifish Association: 10 galões (cerca de 38 L) ou mais para o aquário permanente.", "brasil": "RSDiscus: 'mínimo de 20 litros para um casal, com boa filtragem e plantas para esconderijo'. Só uma loja brasileira encontrada.", "fonte_brasil": "RSDiscus — Killifish Gardneri (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Fundulopanchax gardneri", "url": "https://www.seriouslyfish.com/species/fundulopanchax-gardneri/" },
        { "titulo": "American Killifish Association — Beginner", "url": "https://aka.org/beginner/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "jack-dempsey",
      "nome_popular": "Jack Dempsey",
      "artigo": "o",
      "outros_nomes": ["Jack", "Ciclídeo-jack-dempsey"],
      "nome_cientifico": "Rocio octofasciata",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 20, "max": 20 },
      "temperatura_c": [20, 30],
      "ph": [6.5, 8.0],
      "gh_dgh": [5, 20],
      "litragem_min_l": { "conservador": 243, "pratica_comum": 200, "observacao": "Referência de fora (Seriously Fish): base de 120x45 cm (cerca de 243 L) para um casal adulto. Prática brasileira: RSDiscus (200 L para um casal) e Pró-Aquarista (200 L). Com outros ciclídeos, bem mais: a RSDiscus fala em 300 L ou mais no comunitário." },
      "temperamento": "territorial",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "meio",
      "dieta": "onivoro",
      "come_peixes_pequenos": true,
      "plantas": "arranca",
      "camaroes": "come",
      "nao_misturar_com": [],
      "notas": [
        "Companheiros precisam ser grandes demais para virar presa.",
        "O casal é hostil com outros da espécie e peixes de formato parecido.",
        "Cava e arranca plantas enraizadas."
      ],
      "popular_x_fonte": [
        { "popular": "Jack Dempsey é agressivo com todo mundo.", "fonte_diz": "A Seriously Fish diz que o casal é calmo entre si, mas hostil com outros da espécie e peixes parecidos." }
      ],
      "internacional_x_brasil": [
        { "tema": "Litragem", "internacional": "Seriously Fish: base de 120x45 cm, cerca de 243 L, para um casal adulto.", "brasil": "RSDiscus: 'mínimo de 200 litros para um casal'. Pró-Aquarista: 200 L. A Aqua Stuchi aceita 150 L para o Electric Blue, sozinha nesse número.", "fonte_brasil": "RSDiscus, Pró-Aquarista, Aqua Stuchi (prática brasileira)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Rocio octofasciata", "url": "https://www.seriouslyfish.com/species/rocio-octofasciata/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "polypterus-senegalus",
      "nome_popular": "Polypterus senegalus",
      "artigo": "o",
      "outros_nomes": ["Bichir-do-senegal", "Polypterus", "Peixe-dinossauro"],
      "nome_cientifico": "Polypterus senegalus",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 30, "max": 45 },
      "temperatura_c": [24, 28],
      "ph": [6.2, 7.8],
      "gh_dgh": [5, 20],
      "litragem_min_l": { "conservador": 540, "pratica_comum": 200, "observacao": "Prática brasileira (Fazenda Submersa, Jack Fish): cerca de 200 L (100x40x50 cm) para um adulto; o comprimento do fundo importa mais que a altura. Referência conservadora de fora (Seriously Fish): cerca de 540 L (150x60x60 cm)." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Não briga, mas come o que couber na boca.",
        "Mestre da fuga: tampa justa, sem frestas.",
        "Respira ar: deixe espaço entre a água e a tampa."
      ],
      "popular_x_fonte": [
        { "popular": "Cerca de 200 L bastam para um adulto.", "fonte_diz": "É o que as fontes brasileiras de aquarismo praticam (100x40x50 cm). A Seriously Fish, de fora, recomenda cerca de 540 L, com fundo comprido." },
        { "popular": "Peixe de fundo não pula, dispensa tampa.", "fonte_diz": "A Seriously Fish o chama de mestre da fuga e pede tampa justa." }
      ],
      "fontes": [
        { "titulo": "Fazenda Submersa — Polypterus senegalense (site brasileiro de aquarismo; prática brasileira)", "url": "https://www.fazendasubmersa.com.br/peixes/polypterus-senegalense-polypterus-senegalus" },
        { "titulo": "Aqua Stuchi — Polypterus senegalus (loja brasileira; prática brasileira)", "url": "https://aquastuchi.com.br/produto/polypterus-senegalus-10cm/" },
        { "titulo": "Seriously Fish — Polypterus senegalus (complemento, de fora)", "url": "https://seriouslyfish.com/species/polypterus-senegalus-senegalus" },
        { "titulo": "FishBase — Polypterus senegalus", "url": "https://www.fishbase.se/summary/Polypterus-senegalus.html" },
        { "titulo": "Gensou — Senegal bichir care guide (loja/blog; só para 'prática comum')", "url": "https://gensou.sg/polypterus-senegalus-bichir-care-guide/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "internacional_x_brasil": [
        { "tema": "Tamanho", "internacional": "Seriously Fish e Polypterus.info: até cerca de 50 cm.", "brasil": "Sites e lojas brasileiros falam em 45 cm no máximo e cerca de 30 cm comum (Fazenda Submersa, Aquarismo Paulista), 30 a 40 cm (Aqua Stuchi), 25 a 30 cm (Tankbuster) e 20 a 25 cm típico, até 30-35 cm (Franco Aquarismo). No aquário daqui, conte com uns 30 cm; os 50 cm são o teto da natureza. Não achamos estudo brasileiro nem relato de aquarista com a medida de um adulto: é prática brasileira (fichas de loja/site).", "fonte_brasil": "Fazenda Submersa; Aquarismo Paulista; Aqua Stuchi; Tankbuster; Franco Aquarismo (prática brasileira)" },
        { "tema": "Litragem", "internacional": "Seriously Fish: cerca de 540 L (150x60x60 cm).", "brasil": "As fontes brasileiras praticam cerca de 200 L (100x40x50 cm) para um adulto, com ênfase no comprimento do fundo. Uma ficha brasileira fala em 1.000 L (AqOL, visto só no buscador).", "fonte_brasil": "Fazenda Submersa; Jack Fish (prática brasileira)" },
        { "tema": "No Brasil", "internacional": "Espécie africana, o Polypterus mais vendido no mundo.", "brasil": "Consta na lista de importação permitida de peixes ornamentais (IN Interministerial MPA/MMA 1/2012, Anexo III).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "polypterus-delhezi",
      "nome_popular": "Polypterus delhezi",
      "artigo": "o",
      "outros_nomes": ["Bichir-delhezi", "Armoured bichir", "Peixe-dinossauro"],
      "nome_cientifico": "Polypterus delhezi",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 35, "max": 35 },
      "temperatura_c": [24, 30],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 25],
      "litragem_min_l": { "conservador": 540, "pratica_comum": 205, "observacao": "A Seriously Fish pede base de 120x45 cm (cerca de 205 L) para esta espécie, mas 150x60 cm (cerca de 540 L) para o senegalus, que é menor. Conservador = 540 L por coerência (regra prática); 205 L = número da própria fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Como reconhecer: é do grupo de maxilar de cima igual ou maior que o de baixo, como o senegalus e o ornatipinnis. Entre eles, só o nome científico separa com segurança.",
        "Chega a 35 cm sem a cauda, mais que o senegalus: come o que couber na boca.",
        "Tampa justa e espaço entre a água e a tampa: respira ar."
      ],
      "popular_x_fonte": [
        { "popular": "Todo Polypterus fica do tamanho do senegalus.", "fonte_diz": "A Seriously Fish registra 35 cm para o delhezi; outras espécies passam de 60 cm." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Espécie africana, vendida no mundo todo.", "brasil": "Consta na lista de importação permitida de peixes ornamentais (IN Interministerial MPA/MMA 1/2012, Anexo III).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Polypterus delhezi", "url": "https://www.seriouslyfish.com/species/polypterus-delhezi/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "polypterus-ornatipinnis",
      "nome_popular": "Polypterus ornatipinnis",
      "artigo": "o",
      "outros_nomes": ["Bichir-ornatipinnis", "Ornate bichir", "Peixe-dinossauro"],
      "nome_cientifico": "Polypterus ornatipinnis",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 60, "max": 60 },
      "temperatura_c": [25, 28],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 25],
      "litragem_min_l": { "conservador": 648, "pratica_comum": 648, "observacao": "A fonte pede base de 180x60 cm (cerca de 648 L) para um adulto. Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "É o maior Polypterus do grupo de maxilar de cima (o do senegalus): peça o nome científico na loja.",
        "Chega a 60 cm sem a cauda (no aquário costuma ficar menor): come qualquer peixe que caiba na boca.",
        "Tampa justa e espaço entre a água e a tampa: respira ar."
      ],
      "popular_x_fonte": [
        { "popular": "É um Polypterus pequeno como o senegalus.", "fonte_diz": "A Seriously Fish registra até 60 cm e pede aquário de 180x60 cm." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Espécie africana, vendida no mundo todo.", "brasil": "Consta na lista de importação permitida de peixes ornamentais (IN Interministerial MPA/MMA 1/2012, Anexo III).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Polypterus ornatipinnis", "url": "https://www.seriouslyfish.com/species/polypterus-ornatipinnis/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "polypterus-bichir",
      "nome_popular": "Polypterus bichir",
      "artigo": "o",
      "outros_nomes": ["Bichir-do-Nilo", "Bichir", "Peixe-dinossauro"],
      "nome_cientifico": "Polypterus bichir",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 72, "max": 72 },
      "temperatura_c": [22, 28],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 25],
      "litragem_min_l": { "conservador": 648, "pratica_comum": 648, "observacao": "A fonte pede base de 180x60 cm (cerca de 648 L); a área de fundo importa mais que a altura. Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Chega a 72 cm sem a cauda (raramente no aquário): come qualquer peixe que caiba na boca.",
        "'Bichir' é usado para várias espécies: confira o nome científico.",
        "Tampa justa e espaço entre a água e a tampa: respira ar."
      ],
      "popular_x_fonte": [
        { "popular": "Bichir é tudo igual.", "fonte_diz": "O Polypterus bichir chega a 72 cm na Seriously Fish, mais que o dobro do senegalus." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Espécie africana, vendida no exterior.", "brasil": "Não aparece na lista de importação permitida da IN Interministerial MPA/MMA 1/2012 (texto original). Desde 2022 a importação segue a Portaria IBAMA 102/2022 (com anexos alterados em 2023); não conseguimos confirmar se a espécie entrou na lista nova. Confira a origem legal antes de comprar: loja registrada, nota fiscal e origem informada.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012; Portaria IBAMA nº 102/2022" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Polypterus bichir bichir", "url": "https://www.seriouslyfish.com/species/polypterus-bichir-bichir/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "polypterus-endlicherii",
      "nome_popular": "Polypterus endlicherii",
      "artigo": "o",
      "outros_nomes": ["Bichir-endlicheri", "Saddled bichir", "Endli", "Peixe-dinossauro"],
      "nome_cientifico": "Polypterus endlicherii",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 75, "max": 75 },
      "temperatura_c": [22, 27],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 25],
      "litragem_min_l": { "conservador": 2268, "pratica_comum": 2268, "observacao": "A fonte pede base de 210x120 cm e 90 cm de altura para o adulto (cerca de 2.268 L). Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Como reconhecer: o maxilar de baixo fica projetado para a frente. No senegalus, no delhezi e no ornatipinnis, o de cima é igual ou maior.",
        "Pode chegar a 75 cm sem a cauda (raramente no aquário): come qualquer peixe que caiba na boca.",
        "Tampa justa e espaço entre a água e a tampa: respira ar."
      ],
      "popular_x_fonte": [
        { "popular": "Endli filhote cabe em aquário médio.", "fonte_diz": "A Seriously Fish registra até 75 cm e pede aquário de 210x120 cm para o adulto." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Espécie africana, vendida no exterior.", "brasil": "Não aparece na lista de importação permitida da IN Interministerial MPA/MMA 1/2012 (texto original). Desde 2022 a importação segue a Portaria IBAMA 102/2022 (com anexos alterados em 2023); não conseguimos confirmar se a espécie entrou na lista nova. Confira a origem legal antes de comprar: loja registrada, nota fiscal e origem informada.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012; Portaria IBAMA nº 102/2022" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Polypterus endlicherii", "url": "https://www.seriouslyfish.com/species/polypterus-endlicherii/" },
        { "titulo": "FishBase — Polypterus endlicherii (até 65,5 cm sem a cauda)", "url": "https://www.fishbase.org/summary/2385" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "peixe-faca-preto",
      "nome_popular": "Peixe-faca-preto",
      "artigo": "o",
      "outros_nomes": ["Ituí-cavalo", "Black ghost", "Peixe-faca-fantasma"],
      "nome_cientifico": "Apteronotus albifrons",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 50, "max": 50 },
      "temperatura_c": [23, 28],
      "ph": [6.0, 8.0],
      "gh_dgh": [5, 10],
      "litragem_min_l": { "conservador": 648, "pratica_comum": 648, "observacao": "A fonte pede base de 180x60 cm (cerca de 648 L) para um adulto." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Adultos comem peixes pequenos; a fonte descarta companheiros com menos de 15 cm.",
        "Briga com outros da mesma espécie: melhor sozinho.",
        "Fica mais ativo com luz fraca."
      ],
      "popular_x_fonte": [
        { "popular": "É um peixe pequeno e exótico para aquário comunitário.", "fonte_diz": "Chega a cerca de 50 cm e a Seriously Fish diz que muita gente compra sem saber quanto cresce." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Vendido no exterior como 'black ghost', peixe exótico.", "brasil": "É nativo da Amazônia e consta na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I). 'Peixe-faca' no Brasil também nomeia outras espécies: o faca-palhaço (Chitala ornata, asiático, até 1 m) é outro peixe.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" },
        { "titulo": "Seriously Fish — Apteronotus albifrons", "url": "https://www.seriouslyfish.com/species/apteronotus-albifrons/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "botia-palhaco",
      "nome_popular": "Botia-palhaço",
      "artigo": "a",
      "outros_nomes": ["Botia", "Clown loach"],
      "nome_cientifico": "Chromobotia macracanthus",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 40, "max": 40 },
      "temperatura_c": [24, 30],
      "ph": [5.0, 7.0],
      "gh_dgh": [1, 12],
      "litragem_min_l": { "conservador": 648, "pratica_comum": 648, "observacao": "A fonte pede base de 180x60 cm (cerca de 648 L) como mínimo absoluto para um grupo." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 5,
      "zona": "fundo",
      "dieta": "onivoro",
      "come_peixes_pequenos": false,
      "plantas": "come",
      "camaroes": "risco",
      "nao_misturar_com": ["betta", "guppy"],
      "notas": [
        "Vive em grupo de 5 ou 6 ou mais e cresce muito.",
        "Evite peixes lentos de nadadeira longa, como betta e guppy.",
        "Salta: use tampa justa."
      ],
      "popular_x_fonte": [
        { "popular": "Botia resolve praga de caramujo.", "fonte_diz": "Come caramujos, mas a Seriously Fish diz que isso nunca deve ser visto como solução de infestação." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Chromobotia macracanthus", "url": "https://www.seriouslyfish.com/species/chromobotia-macracanthus/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "aruana",
      "nome_popular": "Aruanã",
      "artigo": "o",
      "outros_nomes": ["Aruanã-prateado", "Arowana"],
      "nome_cientifico": "Osteoglossum bicirrhosum",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 80, "max": 80 },
      "temperatura_c": [20, 30],
      "ph": [5.0, 7.5],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 720, "pratica_comum": 720, "observacao": "A fonte não dá litros: diz que serve só para aquário público ou particular muito grande, com pelo menos 2 m de comprimento. 720 L é o volume de 200x60x60 cm, um piso, não uma meta." },
      "temperamento": "semi-agressivo",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "superficie",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Pode passar de 80 cm: a fonte o considera inadequado para a maioria das casas.",
        "Salta: tampa pesada e bem justa.",
        "Evite outros peixes de superfície."
      ],
      "popular_x_fonte": [
        { "popular": "Aruanã filhote vai bem num aquário médio.", "fonte_diz": "A Seriously Fish pede aquário de pelo menos 2 m e diz que a espécie não serve para a maioria das casas." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Vendido no exterior como 'silver arowana'; o aruanã-preto (O. ferreirai) é outra espécie, do Rio Negro, que chega a 90 cm (FishBase).", "brasil": "Captura na natureza: nativo da Amazônia, mas fora da lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I); em 2022, liberar a captura das duas espécies de aruanã ainda era uma demanda pendente no comitê de ornamentais do governo. Importação: a mesma IN 1/2012 incluía o aruanã-prateado na lista de importação permitida (Anexo III, item 323). Desde 2022 a importação segue a Portaria IBAMA 102/2022 (com anexos alterados em 2023), e não conseguimos confirmar se ele continua na lista nova. Compre em loja registrada, com nota fiscal e origem informada (importado ou cultivo registrado).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012 (Anexos I e III); Portaria IBAMA nº 102/2022; pauta do CPG Ornamentais (MPA, 2022)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Osteoglossum bicirrhosum", "url": "https://www.seriouslyfish.com/species/osteoglossum-bicirrhosum/" },
        { "titulo": "FishBase — Osteoglossum ferreirai", "url": "https://www.fishbase.se/summary/Osteoglossum-ferreirai.html" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" },
        { "titulo": "Portaria IBAMA nº 102/2022 — importação e exportação de peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/portaria-102-2022_482408.html" },
        { "titulo": "MPA — Pauta do Comitê Permanente de Gestão de Ornamentais (2022), demanda de revisão da Portaria IBAMA/AM 01/2001 (visto no buscador)", "url": "https://www.gov.br/mpa/pt-br/assuntos/pesca-amadora-e-esportiva/rede-pesca-brasil/comites-permanentes-de-gestao-cpgs/cpg-ornamentais/AgendaprviaCPGOrnamentais.pdf" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "frontosa",
      "nome_popular": "Frontosa",
      "artigo": "a",
      "outros_nomes": ["Ciclídeo-frontosa", "Frontosa-do-Tanganica"],
      "nome_cientifico": "Cyphotilapia frontosa",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 25, "max": 25.5 },
      "temperatura_c": [23, 27],
      "ph": [8.0, 9.0],
      "gh_dgh": [10, 25],
      "litragem_min_l": { "conservador": 864, "pratica_comum": 864, "observacao": "A fonte pede base de 240x60 cm (cerca de 864 L) para manter o grupo a longo prazo." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 5,
      "zona": "meio",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "companhia": { "cor": "amarelo", "aceita": [], "texto": "A fonte indica a frontosa para uma comunidade de ciclídeos do Lago Tanganica bem planejada e em aquário grande. Ela come peixes bem menores." },
      "notas": [
        "Vive em grupo: a fonte pede pelo menos 5, de preferência 10.",
        "Come peixes bem menores.",
        "Muito sensível à água ruim: nunca em aquário novo."
      ],
      "popular_x_fonte": [
        { "popular": "Frontosa é calma, então cabe em aquário médio.", "fonte_diz": "A Seriously Fish pede pelo menos 2,4 m de comprimento para o grupo." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Cyphotilapia frontosa", "url": "https://www.seriouslyfish.com/species/cyphotilapia-frontosa/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "faca-palhaco",
      "nome_popular": "Faca-palhaço",
      "artigo": "o",
      "outros_nomes": ["Peixe-faca-palhaço", "Chitala", "Clown knife"],
      "nome_cientifico": "Chitala ornata",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 100, "max": 100 },
      "temperatura_c": [20, 28],
      "ph": [6.0, 8.0],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 720, "pratica_comum": 720, "observacao": "A fonte não dá litros: diz que serve só para aquário público ou particular muito grande, com pelo menos 2 m. 720 L é o volume de 200x60x60 cm, um piso, não uma meta." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "meio",
      "dieta": "carnivoro",
      "come_peixes_pequenos": true,
      "plantas": "seguro",
      "camaroes": "come",
      "nao_misturar_com": ["kinguio"],
      "notas": [
        "Predador obrigatório: come peixes que caibam na boca.",
        "Pode chegar a 1 m: a fonte diz que quase não tem lugar no hobby.",
        "Territorial com outros da espécie."
      ],
      "popular_x_fonte": [
        { "popular": "Filhote de faca-palhaço vai bem num aquário comunitário.", "fonte_diz": "A Seriously Fish diz que só serve para aquário público ou muito grande e especializado." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Chitala ornata", "url": "https://www.seriouslyfish.com/species/chitala-ornata/" }
      ],
      "validado_ceo": true,
      "ilustracao": null
    },
    {
      "id": "cascudo-zebra-l046",
      "nome_popular": "Cascudo-zebra (L046)",
      "artigo": "o",
      "outros_nomes": ["L046", "L46", "L 046", "L 46", "L-046", "L-46", "l46", "L098", "L173", "Acari-zebra", "Zebra pleco", "Hypancistrus zebra"],
      "cascudo": true,
      "codigo_l": ["L046", "L098", "L173"],
      "nome_cientifico": "Hypancistrus zebra",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 8, "max": 8 },
      "temperatura_c": [26, 30],
      "ph": [6.0, 7.5],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 54, "pratica_comum": 54, "observacao": "A Seriously Fish pede base de 60x30 cm (cerca de 54 L), com correnteza forte e muito oxigênio. Temperatura quente e estável." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "territorial_com_cascudos": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "dieta_detalhe": "Carnívoro: alimentos de origem animal (larvas, mexilhão, camarão) e ração de fundo. Quase não come vegetais nem algas.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["cascudo-king-tiger-l066", "cascudo-l260"],
      "companhia": { "cor": "amarelo", "aceita": ["cardinal", "rasbora", "disco", "ramirezi"], "texto": "A fonte diz que o zebra não é bom para o comunitário comum: o ideal é mantê-lo sozinho. Se tiver companheiros, que gostem de água quente e não comam no fundo (pequenos tetras, rasbora, disco, ciclídeos-anões), e ele deve ser o único peixe de fundo." },
      "status_legal_br": { "situacao": "proibido", "texto": "Espécie ameaçada (Criticamente em Perigo). É proibido capturar, transportar e vender peixe da natureza. Só é legal o de aquicultura licenciada, com nota fiscal e origem comprovada." },
      "notas": [
        "Ameaçado de extinção (Criticamente em Perigo). Peixe da natureza é proibido: só compre de aquicultura licenciada, com nota fiscal e origem comprovada.",
        "Carnívoro: não é 'limpa-vidro'. Precisa de comida de origem animal.",
        "Tímido: perde a comida para peixes rápidos. A fonte sugere que seja o único peixe de fundo do aquário.",
        "Não misture com outros Hypancistrus (L066, L260...): podem cruzar e gerar híbridos."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo come alga e limpa o aquário.", "fonte_diz": "A Seriously Fish diz que o zebra é carnívoro e raramente come vegetais." },
        { "popular": "Se a loja tem, pode comprar.", "fonte_diz": "Está na lista nacional de espécies ameaçadas como Criticamente em Perigo. A regra de 2026 proíbe captura, transporte e venda de peixe da natureza; peixe de aquicultura licenciada fica fora da proibição." }
      ],
      "internacional_x_brasil": [
        { "tema": "Status legal", "internacional": "A Seriously Fish registra que o Brasil proibiu a exportação em 2004; lá fora, os vendidos são de criação em cativeiro e custam caro.", "brasil": "Criticamente em Perigo na lista nacional (Portaria MMA 148/2022, mantido na atualização de 27/04/2026). A Portaria GM/MMA 1.666/2026 proíbe captura, transporte, guarda e venda das espécies ameaçadas, com exceção para exemplares de aquicultura licenciada. Em 2016, a Embrapa registrava que a produção comercial em cativeiro ainda era restrita pelo Ibama.", "fonte_brasil": "Portaria MMA nº 148/2022; Portaria GM/MMA nº 1.666/2026; Embrapa, Circular Técnica 82 (2016)" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hypancistrus zebra (L046, L098, L173)", "url": "https://www.seriouslyfish.com/species/hypancistrus-zebra/" },
        { "titulo": "Portaria MMA nº 148/2022 — lista nacional de espécies ameaçadas (H. zebra: CR) (visto no buscador)", "url": "https://www.in.gov.br/en/web/dou/-/portaria-mma-n-148-de-7-de-junho-de-2022-406272733" },
        { "titulo": "Portaria GM/MMA nº 1.666/2026 — regras para as espécies aquáticas ameaçadas (exceção para aquicultura licenciada)", "url": "https://www.legisweb.com.br/legislacao/?id=494853" },
        { "titulo": "Portaria GM/MMA nº 1.667/2026 — lista nacional de peixes e invertebrados aquáticos ameaçados (H. zebra: CR, visto no buscador)", "url": "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/pan/saiba-mais/documentos-e-downloads/9-portaria-gm_mma-no-1-667-de-27-de-abril-de-2026.pdf" },
        { "titulo": "Embrapa — Recomendação para criação do acari-zebra em cativeiro (Circular Técnica 82, 2016; estudo brasileiro; visto no buscador)", "url": "https://ainfo.cnptia.embrapa.br/digital/bitstream/item/156666/1/CT-82.pdf" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-l134",
      "nome_popular": "Cascudo L134 (leopard frog)",
      "artigo": "o",
      "outros_nomes": ["L134", "L 134", "L-134", "l134", "Leopard frog", "Peckoltia leopard frog", "Peckoltia compta"],
      "cascudo": true,
      "codigo_l": ["L134"],
      "nome_cientifico": "Peckoltia compta",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 10, "max": 12 },
      "temperatura_c": [24, 28],
      "ph": [5.0, 7.4],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "Sem fonte técnica com litros: 81 L (base de 90x30 cm) é regra prática, a mesma base que a Seriously Fish pede para o L260, de porte parecido." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Onívoro: ração de fundo com vegetais e um pouco de alimento animal.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "restrito", "texto": "Espécie ameaçada (Em Perigo). A captura para aquário só é permitida dentro do Plano de Recuperação do MMA para o Tapajós, com defeso de janeiro a abril. Compre com nota fiscal e origem informada." },
      "notas": [
        "Espécie ameaçada (Em Perigo): a captura só é permitida dentro de um plano de recuperação do governo. Prefira peixe de criação, com nota fiscal.",
        "Vem do rio Tapajós, de água clara e correnteza: filtro com boa circulação.",
        "O rótulo 'L134' às vezes é usado para outros Peckoltia parecidos: confira o nome científico."
      ],
      "popular_x_fonte": [
        { "popular": "O L134 fica com uns 12 cm.", "fonte_diz": "Bases de aquaristas relatam 10 a 12 cm em aquário; o FishBase registra 6,2 cm (comprimento padrão, sem a cauda) nos exemplares da descrição científica." }
      ],
      "internacional_x_brasil": [
        { "tema": "Status legal", "internacional": "Avaliado como Em Perigo pela IUCN (2018, registro do FishBase).", "brasil": "Faz parte do Plano de Recuperação do MMA para peixes ornamentais ameaçados do Xingu e do Tapajós; a Portaria MMA 130/2018 permite o uso pela pesca nesse plano, e a coleta para no período de cheia (janeiro a abril). Em 27/04/2026 a lista nacional foi atualizada e os planos entraram em revisão; não conferimos a categoria nova.", "fonte_brasil": "MMA — Plano de Recuperação (Xingu e Tapajós); Portaria MMA nº 130/2018; Portaria GM/MMA nº 1.666/2026" }
      ],
      "fontes": [
        { "titulo": "Planet Catfish (Cat-eLog) — Peckoltia compta (L134): 24–28 °C, pH 5,0–7,4 (visto no buscador)", "url": "https://www.planetcatfish.com/common/species.php?species_id=213" },
        { "titulo": "FishBase — Peckoltia compta (6,2 cm SL; IUCN: Em Perigo, 2018)", "url": "https://www.fishbase.se/summary/Peckoltia-compta" },
        { "titulo": "MMA — Plano de Recuperação para espécies ameaçadas de peixes capturados para fins ornamentais (Xingu e Tapajós) (visto no buscador)", "url": "https://www.gov.br/mma/pt-br/composicao/sbc/dpes/planos-de-recuperacao-para-especies-aquaticas-ameacadas-de-extincao/plano_de_recuperacao_peixes_do_xingu_e_tapajos.pdf" },
        { "titulo": "Portaria GM/MMA nº 1.666/2026 — regras para as espécies aquáticas ameaçadas", "url": "https://www.legisweb.com.br/legislacao/?id=494853" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Peckoltia compta na lista de nativos)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-king-tiger-l066",
      "nome_popular": "Cascudo king tiger (L066/L333)",
      "artigo": "o",
      "outros_nomes": ["L066", "L66", "L 066", "L 66", "L-066", "L-66", "l66", "L333", "L 333", "L-333", "l333", "King tiger", "Hypancistrus seideli"],
      "cascudo": true,
      "codigo_l": ["L066", "L333"],
      "nome_cientifico": "Hypancistrus seideli",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 14, "max": 14 },
      "temperatura_c": [26, 30],
      "ph": [5.0, 7.0],
      "gh_dgh": [2, 15],
      "litragem_min_l": { "conservador": 243, "pratica_comum": 243, "observacao": "A Seriously Fish pede base de 120x45 cm (cerca de 243 L)." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "carnivoro",
      "dieta_detalhe": "Adulto come sobretudo alimento animal (larvas, mexilhão, camarão) e ração de fundo; o jovem come mais vegetais. Adulto não come alga.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["cascudo-zebra-l046", "cascudo-l260"],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, como L066 e L333). Compre com nota fiscal." },
      "notas": [
        "L066 e L333 são o mesmo peixe: a espécie foi descrita em 2025 como Hypancistrus seideli.",
        "Come sobretudo proteína: não é cascudo para comer alga.",
        "Não misture com outros Hypancistrus (zebra, L260...): podem cruzar."
      ],
      "popular_x_fonte": [
        { "popular": "L066 e L333 são espécies diferentes.", "fonte_diz": "A descrição científica de 2025 (Neotropical Ichthyology) e a Seriously Fish tratam os dois como a mesma espécie, H. seideli, com padrões de cor variáveis." }
      ],
      "internacional_x_brasil": [
        { "tema": "Origem e conservação", "internacional": "A Seriously Fish alerta que boa parte do hábitat, perto da usina de Belo Monte, tende a ser muito degradada.", "brasil": "Descrito por pesquisadores brasileiros em 2025, do baixo e médio Xingu, junto com o H. yudja (L174). Os autores dizem que as chances de conservação das duas espécies são bem diferentes. O L174 é proibido no Brasil (Portaria SAP/MAPA 410/2021).", "fonte_brasil": "Sousa et al. 2025 — Neotropical Ichthyology 23(1); Portaria SAP/MAPA nº 410/2021" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hypancistrus seideli (L066, L333)", "url": "https://www.seriouslyfish.com/species/hypancistrus-sp-l066" },
        { "titulo": "Sousa et al. 2025 — Two new species of Hypancistrus from the rio Xingu (Neotropical Ichthyology 23(1): e240080; estudo brasileiro; visto no buscador)", "url": "https://doi.org/10.1590/1982-0224-2024-0080" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Hypancistrus sp. L066 e L333)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" },
        { "titulo": "ABL Aquariofilia — Legislação (Portaria SAP/MAPA nº 410/2021 proíbe o L174)", "url": "https://www.ablaquariofilia.org.br/legislacao/" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "ancistrus-l183",
      "nome_popular": "Ancistrus starlight (L183)",
      "artigo": "o",
      "outros_nomes": ["L183", "L 183", "L-183", "l183", "Starlight", "Ancistrus starlight", "Ancistrus dolichopterus"],
      "cascudo": true,
      "codigo_l": ["L183"],
      "nome_cientifico": "Ancistrus dolichopterus",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 20, "max": 20 },
      "temperatura_c": [26, 30],
      "ph": [5.0, 7.0],
      "gh_dgh": [1, 10],
      "litragem_min_l": { "conservador": 243, "pratica_comum": 243, "observacao": "A Seriously Fish pede base de 120x45 cm (cerca de 243 L)." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "territorial_com_cascudos": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Onívoro: ração de fundo, larvas, camarão e vegetais (abobrinha, batata cozida).",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012). Compre com nota fiscal." },
      "notas": [
        "Bem maior que o ancistrus comum: até 20 cm (comprimento sem a cauda).",
        "Água mole, ácida e quente (rio Negro). Não é o ancistrus de água dura das lojas.",
        "Territorial com outros da espécie e com cascudos de formato parecido: a fonte sugere um casal."
      ],
      "popular_x_fonte": [
        { "popular": "Todo ancistrus é pequeno.", "fonte_diz": "A Seriously Fish registra até 20 cm (comprimento padrão) para o L183, contra cerca de 12,5 cm do ancistrus comum." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Por décadas foi confundido com outras espécies de Ancistrus (Seriously Fish).", "brasil": "Provável endêmico do médio e baixo rio Negro (AM). Constava na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Ancistrus dolichopterus (L183)", "url": "https://www.seriouslyfish.com/species/ancistrus-dolichopterus/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Ancistrus dolichopterus)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-l002",
      "nome_popular": "Cascudo L002 (tiger)",
      "artigo": "o",
      "outros_nomes": ["L002", "L02", "L2", "L 002", "L 2", "L-002", "l2", "L074", "Tiger peckoltia", "Tiger pleco", "Panaqolus L002"],
      "cascudo": true,
      "codigo_l": ["L002", "L074"],
      "nome_cientifico": "Panaqolus sp. (L002)",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 10, "max": 12 },
      "temperatura_c": [23, 27],
      "ph": [6.5, 7.5],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "Sem fonte técnica com litros: 81 L (base de 90x30 cm) é regra prática, a mesma base que a Seriously Fish pede para Hypancistrus de porte parecido." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "dieta_detalhe": "Raspador de madeira: precisa de troncos no aquário, além de vegetais e ração de fundo.",
      "precisa_madeira": true,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, como 'Panaque sp. L002'). Compre com nota fiscal." },
      "notas": [
        "Precisa de madeira no aquário: raspa troncos o tempo todo.",
        "Pequeno (cerca de 10 cm sem a cauda) e do rio Tocantins.",
        "O L074 parece ser uma forma desbotada do L002 (Planet Catfish)."
      ],
      "popular_x_fonte": [
        { "popular": "Tronco no aquário é só enfeite.", "fonte_diz": "Para os Panaqolus, a madeira é parte importante da alimentação (importador especializado Aquarium Glaser). Estudos com cascudos 'comedores de madeira' mostram que eles digerem pouco a celulose e aproveitam o que cresce e se decompõe na madeira." }
      ],
      "fontes": [
        { "titulo": "Planet Catfish (Cat-eLog) — Panaqolus sp. (L002): 100 mm SL, 23–27 °C, pH 6,5–7,5, rio Tocantins (visto no buscador)", "url": "https://www.planetcatfish.com/panaqolus_sp(l002)" },
        { "titulo": "Aquarium Glaser — Panaqolus sp. L2 (madeira como alimento; visto no buscador)", "url": "https://www.aquariumglaser.de/en/10-catfishes/panaqolus-sp-l2-2/" },
        { "titulo": "German, D. P. & Bittong, R. A. 2009 — digestão em cascudos que comem madeira (J. Comp. Physiol. B 179; visto no buscador)", "url": "https://link.springer.com/article/10.1007/s00360-009-0383-z" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Panaque sp. L002)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-l260",
      "nome_popular": "Cascudo L260 (queen arabesque)",
      "artigo": "o",
      "outros_nomes": ["L260", "L 260", "L-260", "l260", "Queen arabesque", "Hypancistrus L260"],
      "cascudo": true,
      "codigo_l": ["L260"],
      "nome_cientifico": "Hypancistrus sp. (L260)",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 9, "max": 9 },
      "temperatura_c": [24, 30],
      "ph": [5.5, 7.5],
      "gh_dgh": [1, 15],
      "litragem_min_l": { "conservador": 81, "pratica_comum": 81, "observacao": "A Seriously Fish pede base de 90x30 cm (cerca de 81 L)." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": false,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Onívoro com preferência por alimento animal (larvas, dáfnia, camarão) e ração de fundo; aceita alguns vegetais.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": ["cascudo-zebra-l046", "cascudo-king-tiger-l066"],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, como 'Hypancistrus sp. L260'). Compre com nota fiscal." },
      "notas": [
        "Pequeno (cerca de 9 cm sem a cauda) e pacífico; longe de peixes agressivos.",
        "Gosta de proteína: não conte com ele para comer alga.",
        "Não misture com outros Hypancistrus: podem cruzar."
      ],
      "popular_x_fonte": [
        { "popular": "L260 e L411 são o mesmo peixe.", "fonte_diz": "A Seriously Fish diz que o L411, do rio Jari, é parecido, maior e não é esta espécie." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Espécie ainda sem nome científico, conhecida pelo código L260.", "brasil": "Só conhecido no baixo rio Tapajós (PA). Constava na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hypancistrus sp. (L260)", "url": "https://www.seriouslyfish.com/species/hypancistrus-sp-l260/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Hypancistrus sp. L260)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-ouro-l018",
      "nome_popular": "Cascudo gold nugget (L018/L081/L085/L177)",
      "artigo": "o",
      "outros_nomes": ["L018", "L18", "L 018", "L-018", "l18", "L081", "L81", "L 081", "L085", "L85", "L 085", "L177", "L 177", "L-177", "l177", "LDA060", "Gold nugget", "Pepita de ouro", "Pepita-de-ouro", "Cascudo pepita de ouro", "Baryancistrus xanthellus"],
      "cascudo": true,
      "codigo_l": ["L018", "L081", "L085", "L177"],
      "nome_cientifico": "Baryancistrus xanthellus",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 22.4, "max": 22.4 },
      "temperatura_c": [27, 32],
      "ph": [6.0, 8.0],
      "gh_dgh": [3, 15],
      "litragem_min_l": { "conservador": 243, "pratica_comum": 243, "observacao": "A Seriously Fish pede no mínimo base de 120x45 cm (cerca de 243 L)." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "territorial_com_cascudos": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Na natureza raspa algas e biofilme e come pequenos invertebrados. No aquário: ração de fundo com vegetais, larvas, frutas e legumes.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012). Compre com nota fiscal." },
      "notas": [
        "Água bem quente (27 a 32 °C): não combina com a maioria dos peixes comunitários.",
        "Jovem é calmo; macho adulto briga com outros machos e com peixes de fundo que vê como rivais.",
        "L018, L081, L085 e L177 são populações da mesma espécie, do rio Xingu e do Iriri."
      ],
      "popular_x_fonte": [
        { "popular": "Cada código L é uma espécie diferente.", "fonte_diz": "A Seriously Fish lista L018, L081, L085 e L177 como a mesma espécie, B. xanthellus, de pontos diferentes do Xingu e do Iriri." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Vendido no mundo todo como 'gold nugget pleco'.", "brasil": "Endêmico da bacia do Xingu (PA); a população L018/L085 vem da Volta Grande, trecho afetado pela usina de Belo Monte. Constava na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Baryancistrus xanthellus (L018, L081, L085, L177)", "url": "https://www.seriouslyfish.com/species/baryancistrus-xanthellus/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Baryancistrus xanthellus)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-pintado-l001",
      "nome_popular": "Cascudo pintado de ouro (L001)",
      "artigo": "o",
      "outros_nomes": ["L001", "L01", "L1", "L 001", "L 1", "L-001", "l1", "Gold spot pleco", "Pterygoplichthys joselimaianus"],
      "cascudo": true,
      "codigo_l": ["L001"],
      "nome_cientifico": "Pterygoplichthys joselimaianus",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 39.5, "max": 39.5 },
      "temperatura_c": [24, 29],
      "ph": [6.5, 7.5],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 540, "pratica_comum": 540, "observacao": "Sem fonte técnica com litros: 540 L é regra prática (mesma base dos cascudos de vela grandes). Não achamos prática comum com fonte." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "dieta_detalhe": "Herbívoro como os outros cascudos de vela: vegetais e ração de fundo vegetal.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "arranca",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012). Compre com nota fiscal e nunca solte na natureza." },
      "notas": [
        "Como reconhecer: cascudo de vela (Pterygoplichthys) marrom-escuro com pintas claras, douradas, no corpo todo.",
        "Chega a cerca de 40 cm (comprimento sem a cauda): planeje para o adulto.",
        "Com a idade fica mais briguento e territorial."
      ],
      "popular_x_fonte": [
        { "popular": "É um cascudo pequeno e diferente.", "fonte_diz": "O FishBase registra 39,5 cm (comprimento padrão) para esta espécie: é um cascudo de vela grande, como o bodó." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Vendido como 'gold spot pleco'; às vezes também com o código L022.", "brasil": "Nativo da bacia do Tocantins. Constava na lista de nativos de captura permitida para aquário (IN Interministerial MPA/MMA 1/2012, Anexo I).", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "FishBase — Pterygoplichthys joselimaianus (39,5 cm SL; 24–29 °C; bacia do Tocantins)", "url": "https://www.fishbase.se/summary/Pterygoplichthys-joselimaianus" },
        { "titulo": "ScotCat — Pterygoplichthys joselimaianus (pH; fica territorial com a idade; visto no buscador)", "url": "https://www.scotcat.com/loricariidae/pterygoplichthys_joselimaianus.htm" },
        { "titulo": "Wikipedia — Pterygoplichthys joselimaianus (L001/L022; pH 6,5–7,5; visto no buscador)", "url": "https://en.wikipedia.org/wiki/Pterygoplichthys_joselimaianus" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Pterygoplichthys joselimaianus)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-galaxy-l029",
      "nome_popular": "Cascudo galaxy (L029/L007)",
      "artigo": "o",
      "outros_nomes": ["L029", "L29", "L 029", "L-029", "l29", "L007", "L7", "L 007", "L-007", "Galaxy pleco", "Leporacanthicus galaxias"],
      "cascudo": true,
      "codigo_l": ["L029", "L007"],
      "nome_cientifico": "Leporacanthicus galaxias",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 25, "max": 25 },
      "temperatura_c": [22, 26],
      "ph": [5.6, 7.0],
      "gh_dgh": [0, 10],
      "litragem_min_l": { "conservador": 243, "pratica_comum": 243, "observacao": "A Seriously Fish pede base de 120x45 cm (cerca de 243 L) como mínimo para um peixe, por ser territorial." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "territorial_com_cascudos": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Puxa para carnívoro: minhoca, camarão, mexilhão, larvas e ração de fundo. Come caramujos, o que é raro entre cascudos.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, incluindo a forma L007). Compre com nota fiscal." },
      "notas": [
        "Come caramujos e muita proteína: não é cascudo de alga.",
        "Territorial com outros peixes de fundo, principalmente os de cor parecida; tranquilo com peixes de meia-água.",
        "L029 é o galaxy verdadeiro; L007 é uma forma parecida."
      ],
      "popular_x_fonte": [
        { "popular": "Cascudo não come caramujo.", "fonte_diz": "A Seriously Fish destaca que esta espécie come caramujos, o que é incomum entre cascudos." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Formas parecidas (L240, L241) vêm da Venezuela.", "brasil": "Nativo de bacias brasileiras como Amazonas e Tocantins. A IN Interministerial MPA/MMA 1/2012 (Anexo I) listava L. galaxias e L. cf. galaxias 'L007' entre os nativos de captura permitida.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Leporacanthicus galaxias (L029; L007 parecido)", "url": "https://www.seriouslyfish.com/species/leporacanthicus-galaxias/" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Leporacanthicus galaxias e cf. galaxias L007)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-royal-l027",
      "nome_popular": "Cascudo royal (L027)",
      "artigo": "o",
      "outros_nomes": ["L027", "L27", "L 027", "L 27", "L-027", "l27", "LDA077", "Royal pleco", "Panaque royal", "Panaque armbrusteri"],
      "cascudo": true,
      "codigo_l": ["L027"],
      "nome_cientifico": "Panaque armbrusteri (e formas próximas vendidas como L027)",
      "nivel": "avancado",
      "tamanho_adulto_cm": { "tipico": 40, "max": 60 },
      "temperatura_c": [26, 30],
      "ph": [5.0, 7.0],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 720, "pratica_comum": 720, "observacao": "A base alemã Welsfans recomenda aquário de 2 m. 720 L é o volume de 200x60x60 cm: regra prática, um piso." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "herbivoro",
      "dieta_detalhe": "Raspador de madeira: madeira sempre disponível no aquário, mais vegetais. Também come plantas.",
      "precisa_madeira": true,
      "come_peixes_pequenos": false,
      "plantas": "come",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "permitido", "texto": "Constava na lista de nativos de captura permitida (IN 1/2012, escrito 'Panaque ambrusteri'). Compre com nota fiscal." },
      "notas": [
        "Precisa de madeira o tempo todo: raspa troncos e come o que cresce neles.",
        "Fica grande: 40 cm sem a cauda e até cerca de 60 cm de comprimento total.",
        "O código L027 cobre formas de rios diferentes (Tapajós, Tocantins, Xingu, Araguaia); as fontes divergem na temperatura (Planet Catfish: 23 a 27 °C na forma do Tapajós)."
      ],
      "popular_x_fonte": [
        { "popular": "O royal vive de madeira.", "fonte_diz": "A madeira deve estar sempre no aquário (Planet Catfish), mas estudos de digestão (German & Bittong 2009) mostram que esses cascudos aproveitam pouco a celulose: precisam também de vegetais e ração." }
      ],
      "internacional_x_brasil": [
        { "tema": "No Brasil", "internacional": "Vendido como 'royal pleco' e com códigos LDA.", "brasil": "Descrito do rio Teles Pires (bacia do Tapajós, MT); formas parecidas no Tocantins e no Xingu. A IN Interministerial MPA/MMA 1/2012 (Anexo I) listava a espécie entre os nativos de captura permitida.", "fonte_brasil": "IN Interministerial MPA/MMA nº 1/2012" }
      ],
      "fontes": [
        { "titulo": "Planet Catfish (Cat-eLog) — Panaque armbrusteri (L027; madeira no aquário; 23–27 °C; visto no buscador)", "url": "https://www.planetcatfish.com/common/species.php?species_id=1304" },
        { "titulo": "Welsfans/Südamerikafans — Panaque sp. aff. armbrusteri 'L 27' (cerca de 60 cm; aquário de 2 m; 26–30 °C)", "url": "https://www.suedamerikafans.de/en/wels-datenbank/welsart/?art=112" },
        { "titulo": "Welsfans/Südamerikafans — Panaque armbrusteri (L 27 / LDA 77) (pH 5,0–7,0; visto no buscador)", "url": "https://www.suedamerikafans.de/en/wels-datenbank/welsart/?art=115" },
        { "titulo": "German, D. P. & Bittong, R. A. 2009 — digestão em cascudos que comem madeira (J. Comp. Physiol. B 179; visto no buscador)", "url": "https://link.springer.com/article/10.1007/s00360-009-0383-z" },
        { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — Anexo I (Panaque ambrusteri)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    },
    {
      "id": "cascudo-green-phantom-l200",
      "nome_popular": "Cascudo green phantom (L200)",
      "artigo": "o",
      "outros_nomes": ["L200", "L 200", "L-200", "l200", "Green phantom", "Hemiancistrus subviridis"],
      "cascudo": true,
      "codigo_l": ["L200"],
      "nome_cientifico": "Hemiancistrus subviridis",
      "nivel": "intermediario",
      "tamanho_adulto_cm": { "tipico": 15, "max": 15 },
      "temperatura_c": [26, 30],
      "ph": [6.0, 7.8],
      "gh_dgh": null,
      "litragem_min_l": { "conservador": 243, "pratica_comum": 243, "observacao": "A Seriously Fish fala em 'várias centenas de litros', sem medida. 243 L (base de 120x45 cm) é regra prática, a mesma base que ela pede para cascudos de 14 a 25 cm." },
      "temperamento": "pacifico",
      "agressivo_com_mesma_especie": true,
      "territorial_com_cascudos": true,
      "grupo_minimo": 1,
      "zona": "fundo",
      "dieta": "onivoro",
      "dieta_detalhe": "Onívoro: ração de algas, larvas, Mysis e legumes escaldados.",
      "precisa_madeira": false,
      "come_peixes_pequenos": false,
      "plantas": "seguro",
      "camaroes": "risco",
      "nao_misturar_com": [],
      "status_legal_br": { "situacao": "confira", "texto": "Espécie da Venezuela e da Colômbia: no Brasil só vem importada. Não confirmamos se está na lista de importação permitida; compre em loja registrada, com nota fiscal e origem." },
      "notas": [
        "Importado (Venezuela e Colômbia): confira a origem legal antes de comprar.",
        "Territorial, mais ainda quando adulto: uma toca por cascudo e companheiros de meia-água.",
        "O código L200 também é usado para outro peixe, o Baryancistrus demantoides, mais briguento."
      ],
      "popular_x_fonte": [
        { "popular": "L200 é um peixe só.", "fonte_diz": "A Seriously Fish diz que o código L200 é usado para H. subviridis e para Baryancistrus demantoides." }
      ],
      "fontes": [
        { "titulo": "Seriously Fish — Hemiancistrus subviridis (L200)", "url": "https://www.seriouslyfish.com/species/hemiancistrus-subviridis/" },
        { "titulo": "Portaria IBAMA nº 102/2022 — importação de peixes ornamentais (texto com anexos)", "url": "https://www.normasbrasil.com.br/norma/portaria-102-2022_482408.html" }
      ],
      "validado_ceo": false,
      "ilustracao": null
    }
  ]
}
;
