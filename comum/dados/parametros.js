/* gerado por atualizar-dados.ps1 a partir de parametros.json — não edite à mão */
window.PARAGON_PARAMETROS = {
  "versao": "regras.md da Ana, 20/10/2026",
  "constantes": {
    "FRACAO_PREDACAO_VERMELHO": { "valor": 0.46, "base": "FONTE", "fontes": ["R1"], "explicacao": "Maior presa ingerida por predadores de água doce: até 46% do comprimento do predador (teto, o lado mais protetor)." },
    "FRACAO_PREDACAO_AMARELO": { "valor": 0.60, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "O peixe da loja é menor que o adulto da ficha: margem nossa até 60%, sem número de estudo." },
    "MARGEM_TEMPERATURA_C": { "valor": 2, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "Aquecedor e ambiente oscilam: faixa comum com menos de 2 °C tem pouca margem (decisão nossa)." },
    "MARGEM_PH": { "valor": 0.5, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "Faixa comum com menos de 0,5 de pH tem pouca margem (decisão nossa)." },
    "LITROS_POR_CM_TROPICAL": { "valor": 2, "base": "FONTE", "fontes": ["R2"], "explicacao": "RSPCA: 1,5 a 2 L por cm de peixe tropical, sem a cauda (usamos o topo). A própria RSPCA diz que é só orientação." },
    "LITROS_POR_CM_KINGUIO": { "valor": 4, "base": "FONTE", "fontes": ["R2"], "explicacao": "RSPCA: 2 L por 0,5 cm de peixe-dourado." },
    "LITROS_EXTRA_POR_KINGUIO": { "valor": 40, "base": "FONTE", "fontes": ["R4"], "explicacao": "SPCA Nova Zelândia: +40 L por kinguio além do primeiro (no conservador)." },
    "PORTE_TERRITORIAL_GRANDE_CM": { "valor": 15, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "Porte a partir do qual a briga entre territoriais costuma ferir, não só estressar (decisão nossa)." },
    "FRACAO_TAMANHO_INTIMIDACAO": { "valor": 0.5, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "Peixe pacífico com menos da metade do tamanho de um territorial tende a ser intimidado (decisão nossa)." },
    "KINGUIO_TROPICAL_MIN_C": { "valor": 22, "base": "REGRA PRÁTICA", "fontes": [], "explicacao": "Tropical com mínimo a partir de 22 °C pede aquecedor no inverno de boa parte do Brasil: com kinguio, vira atenção mesmo havendo faixa comum (número nosso, sem estudo)." }
  },
  "base_por_tipo": {
    "temperatura": { "base": "FONTE", "explicacao": "Faixas de cada espécie: Seriously Fish (kinguio: teto da RSPCA Austrália e piso do estudo brasileiro com ovos e larvas). A margem de 2 °C e o corte kinguio x tropical (22 °C) são REGRA PRÁTICA.", "constantes": ["MARGEM_TEMPERATURA_C", "KINGUIO_TROPICAL_MIN_C"], "fontes": ["R3", "R5"] },
    "ph": { "base": "FONTE", "explicacao": "Faixas de cada espécie: Seriously Fish. A margem de 0,5 é REGRA PRÁTICA.", "constantes": ["MARGEM_PH"], "fontes": [] },
    "gh": { "base": "REGRA PRÁTICA", "explicacao": "Faixas com fonte; só dá atenção (nunca vermelho) porque a dureza tolerada costuma ser mais larga que a publicada e as fontes divergem.", "constantes": [], "fontes": [] },
    "predacao": { "base": "FONTE", "explicacao": "Fração da boca: Gaeta et al. 2018 (predadores de clima temperado; peixes altos e achatados são engolidos menores). A faixa de atenção até 60% é REGRA PRÁTICA.", "constantes": ["FRACAO_PREDACAO_VERMELHO", "FRACAO_PREDACAO_AMARELO"], "fontes": ["R1"] },
    "lista": { "base": "FONTE", "explicacao": "A ficha técnica de uma das espécies nomeia a outra (ou o grupo dela) como companhia a evitar.", "constantes": [], "fontes": [] },
    "companhia": { "base": "FONTE", "explicacao": "A ficha técnica diz que a espécie não serve para o aquário comunitário comum e indica com quem pode ficar. A frase é da fonte; a cor (atenção ou sério) é REGRA PRÁTICA: sério só onde a fonte é taxativa.", "constantes": [], "fontes": [] },
    "temperamento": { "base": "REGRA PRÁTICA", "explicacao": "As fichas descrevem o temperamento em palavras; os cortes de 15 cm e de metade do tamanho, e o nível de cada par (ex.: agressivo + semiagressivo = atenção), são decisão nossa.", "constantes": ["PORTE_TERRITORIAL_GRANDE_CM", "FRACAO_TAMANHO_INTIMIDACAO"], "fontes": [] },
    "mesma": { "base": "FONTE", "explicacao": "A marcação de briga com a mesma espécie vem da ficha de cada espécie.", "constantes": [], "fontes": [] },
    "cardume": { "base": "FONTE", "explicacao": "Número mínimo da Seriously Fish/FishBase de cada espécie. Onde a fonte não dá número (coridora-pimenta, vivíparos, ramirezi, mbuna, kinguio), é REGRA PRÁTICA.", "constantes": [], "fontes": [] },
    "litragem": { "base": "FONTE", "explicacao": "Mínimo da maior espécie (Seriously Fish; kinguio: SPCA/RSPCA) e conta de carga da RSPCA, que é só orientação. O app usa o maior dos dois.", "constantes": ["LITROS_POR_CM_TROPICAL", "LITROS_POR_CM_KINGUIO", "LITROS_EXTRA_POR_KINGUIO"], "fontes": ["R2", "R4"] },
    "plantas": { "base": "FONTE", "explicacao": "Jack Dempsey, Oscar, botia e kinguio com fonte; mbuna, cascudos grandes e peixe-papagaio são REGRA PRÁTICA.", "constantes": [], "fontes": ["R3"] },
    "camaroes": { "base": "REGRA PRÁTICA", "explicacao": "Nenhuma ficha aberta fala de camarão: predadores e ciclídeos de 15 cm ou mais comem; os demais podem comer filhotes.", "constantes": [], "fontes": [] },
    "legal": { "base": "FONTE", "explicacao": "Lista nacional de espécies ameaçadas (Portaria MMA 148/2022, atualizada pela Portaria GM/MMA 1.667/2026) e regras para ameaçadas (Portaria GM/MMA 1.666/2026: proíbe captura, transporte e venda; exceção para aquicultura licenciada). As fontes de cada espécie estão na ficha.", "constantes": [], "fontes": [] },
    "cascudos": { "base": "FONTE", "explicacao": "Quem defende toca contra outros cascudos vem das fichas da Seriously Fish. A cor amarela é REGRA PRÁTICA.", "constantes": [], "fontes": [] },
    "madeira": { "base": "FONTE", "explicacao": "Panaque e Panaqolus raspam madeira (Planet Catfish; Aquarium Glaser). Estudos de digestão mostram que aproveitam pouco a celulose: madeira e também vegetais.", "constantes": [], "fontes": [] },
    "sozinho": { "base": "FONTE", "explicacao": "Seriously Fish: o betta não é recomendado para o comunitário comum e, na maioria dos casos, fica melhor sozinho; RSPCA Austrália: juntar o macho com outros peixes não é recomendado para iniciantes. A cor (atenção, não vermelho) é REGRA PRÁTICA.", "constantes": [], "fontes": ["R17"] }
  },
  "fontes_regras": {
    "R1": { "titulo": "Gaeta et al. (2018), PLoS ONE 13(3): e0194092 — tamanho de presa de peixes predadores", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5854328" },
    "R2": { "titulo": "RSPCA (Reino Unido) — Choosing an aquarium", "url": "https://www.rspca.org.uk/adviceandwelfare/pets/fish/environment" },
    "R3": { "titulo": "RSPCA Austrália — How should I keep and care for my goldfish?", "url": "https://kb.rspca.org.au/knowledge-base/how-should-i-keep-and-care-for-my-goldfish/" },
    "R4": { "titulo": "SPCA Nova Zelândia — Debunking goldfish myths", "url": "https://spca.nz/advice-and-welfare/article/debunking-goldfish-myths" },
    "R5": { "titulo": "Motta et al. (2023), Brazilian Journal of Biology 83 — temperatura no desenvolvimento de ovos e larvas de kinguio (estudo brasileiro)", "url": "https://www.scielo.br/j/bjb/a/xXHPTXjsWrSzrWGxqTHtcKw/?lang=en" },
    "R6": { "titulo": "IN Interministerial MPA/MMA nº 1/2012 — peixes ornamentais (norma brasileira; texto original)", "url": "https://www.normasbrasil.com.br/norma/instrucao-normativa-1-2012_78582.html" },
    "R7": { "titulo": "Birindelli, Zanata & Lima (2007), Neotropical Ichthyology 5(3) — raios da dorsal dos cascudos (estudo brasileiro)", "url": "https://www.scielo.br/j/ni/a/CCQnv558MqjxsSWBLYhFtxz/?lang=en" },
    "R8": { "titulo": "Sousa et al. (2019), Boletim do Instituto de Pesca 45(2) — crescimento do bodó no baixo Amazonas (estudo brasileiro)", "url": "https://institutodepesca.org/index.php/bip/article/view/1356" },
    "R9": { "titulo": "Oliveira et al. (2008), Acta Amazonica 38(4) — tolerância do cardinal a temperatura, pH, amônia e nitrito (INPA)", "url": "https://www.scielo.br/j/aa/a/FYCZj6tsgyvP9QcXYh7yPnC/?lang=en" },
    "R17": { "titulo": "RSPCA Austrália — How should I care for my Siamese fighting fish?", "url": "https://kb.rspca.org.au/knowledge-base/how-should-i-care-for-my-siamese-fighting-fish/" }
  },
  "especiais": {
    "agua_fria": ["kinguio"],
    "mesma_especie_vermelho": ["betta"],
    "mesma_especie_nota": { "oscar": "Casal já formado pode dar certo; dois comprados juntos sem ser casal tendem a brigar." },
    "grupo_casal": ["ramirezi"],
    "sozinho_preferivel": ["betta"],
    "nome_proprio": ["oscar", "jack-dempsey", "polypterus-senegalus", "polypterus-delhezi", "polypterus-ornatipinnis", "polypterus-bichir", "polypterus-endlicherii"],
    "ids_antigos": { "cascudo-comum": { "nome": "Cascudo-comum", "agora": ["cascudo-bodo", "cascudo-hypostomus", "cascudo-gibbiceps", "cascudo-anisitsi"] } }
  },
  "escala_temperatura_c": [10, 34],
  "escala_ph": [3.5, 9]
}
;
