
import Library from '../src/SkydropExcel'


let addresses = [
  "AV. ADOLFO LOPEZ MATEOS 4207 - 7, RINCÓN DEL ORIENTE",
  "Quintas de los ciruelos 112, QUINTAS DE ANÁHUAC",
  "Poniente 1019, LAS PUENTES SECTOR 1",
  "Dali, 814, HIMALAYA SECTOR NIZA",
  "paseo de los morales 101, residencial los morales",
  "Av. Las torrres #208 Col Casa Bella, CASA BELLA SECTOR 2 1A ETAPA",
  "Lima 405, RESIDENCIAL SANTO DOMINGO",
  "Fuente Dulce 523 Col. Fuentes de Anahuac, FUENTES DE ANÁHUAC",
  "Calle Mantarraya 642 entre ave las Torre y Anillo Periferico, JARDINES DEL MEZQUITAL",
  "gonzalitos 931 int 6, CHAPULTEPEC",
  "Ebano 1133, CERRADAS DE ANÁHUAC SECTOR CONTEMPORÁNEO",
  "Azurita #1058, LOS NARANJOS SECTOR 1",
  "HERCULES NUM 0244, LAS HADAS",
  "Carr. A Colombia Km 5.75, GRAL. ESCOBEDO CENTRO",
  "carpino, 1000 casa, PEDREGAL DE SAN AGUSTÍN",
  "Don José 118, COLONIAL LAGRANGE",
  "Av. Jabatos #268, RESIDENCIAL PASEO DE LOS ÁNGELES",
  "Plutarco Elias Calles 327, RESIDENCIAL PERIFÉRICO",
  "Manzano #419, entre calles Peral y Mora, ARBOLEDAS DEL MEZQUITAL",
  "Sierra de la soledad 212",
  "Tigres #103, Colonia Paseo de los Angeles",
  "del parque 919, HACIENDA LOS MORALES SECTOR 1",
  "carretera miguel aleman 804 local 9, HACIENDA LAS FUENTES",
  "Marseille 432, RESIDENCIAL LOS ANGELES SECT 1",
  "Mina 222 Colonia Anahuac, Madeira",
  "Vía a Matamoros 1503, INDUSTRIAL NOGALAR",
  "vicsa #234, INDUSTRIAS DEL VIDRIO SECTOR 1",
  "Calle ejército constitucionalista 124, CONSTITUYENTES DE QUERETARO SECTOR 1",
  "12a Calle # 142, Col. Miguel Aleman",
  "BERNARDO REYES 403 PTE, SAN NICOLÁS DE LOS GARZA CENTRO",
  "Av. Los Pinos #417 Villas de Oriente, 66470",
  "cordillera de los Andes 720, RESIDENCIAL LAS PUENTES SECTOR 1 SECCIÓN A",
  "Vereda # 302  Colonia La Enramada  1er sector, LA ENRAMADA",
  "Rioja 231, Topo Grande, TOPO GRANDE",
  "Lago de Montebello 119, SAN BENITO DEL LAGO",
  "san pedro, 130, MISIÓN SAN JOSE",
  "ARBOR 119 PTE, BONATERRA",
  "CLAUDIA 426, LOS PINCELES",
  "Chipre 200, NUEVO AMANECER 1",
  "Montis 211 Ote, BONATERRA",
  "GENOVA NORTE 102, CERRADAS DE SANTA ROSA",
  "av. Golondrinas #238, PRIVADAS DE SANTA ROSA",
  "Parras 506,, VALLE DE LAS PALMAS VI",
  "Padre Mier 445 Huinala Apodaca, Nuevo leon, Mexico, CP66640, HUINALÁ",
  "dante aligheri  1022, SANTA CECILIA","calle Gladiola 238, VILLAS DE SANTA ROSA","Via Florencia #375, CERRADA LA TOSCANA","Ruiseñor #209, Paseo de Sta Rosa","Juan Sanabria 1031, SANTA CECILIA II","Ruben Dario 1001, SANTA CECILIA VI","Parras 506,, VALLE DE LAS PALMAS VI","Iris #108, PRIVALIA HUINALÁ","av. Golondrinas #238, PRIVADAS DE SANTA ROSA","Av. Nuevo Leon 340, NOVA APODACA","mision de san juan num.127, MISIÓN SAN JOSE","Av, Alianza sur 200  (Parque de investigación e innovación, MONTERREY (GRAL. MARIANO ESCOBEDO)","Hidalgo 324, Desarrollos CSI SA de CV, APODACA CENTRO","Callejon de los Hernadez 146, Privada Iltamarindo","Valle de Zaragoza 922, VALLE DE LOS NOGALES 1E","Azucena 502, VALLE DE LAS PALMAS III","MEZQUITE 103, BOSQUES DEL VERGEL","Patagonia 17, Apartment 102","Casasola#3217 Col. Alta Vista Sur","(Room No. 306), Arquitectos 110, TECNOLÓGICO","Malibu 10 Los Angeles Bosque Residencial","Privada Alhambra 148, La Alhambra","Plaza San Pedro 5501, Colonia Jardines del Paseo, MIRADOR","Hacienda de Coyoacán 4319, RESIDENCIAL LA HACIENDA","Av lazaro cardenas 2932 ote Col. mirador residencial","Julian Javier, 1435, LA FLORIDA","Catalina Pizarro #411, JARDINES ROMA","Privada Asturias #1008 interior 18, SAN PABLO","privanza lucerna 1103 colonia privanzas 5 sector, PRIVANZAS 5 SECTOR","Camino de Abasolo, 116, PORTAL DEL HUAJUCO","Lago de Patzcuaro, 1330, ANCIRA","Gallarda 613, EL SABINO CERRADA RESIDENCIAL","AV. E. GARZA SADA 2501 SUR OFICINA 2-215 COL. TECNOLÓGICO, INSTITUTO TECNOLÓGICO Y DE ESTUDIOS SUPERIORES DE MONTERREY","Maguey 223, ANTIGUA","La Ronda 4, BOSQUENCINOS 1ER 2DA Y 3RA ETAPA","Camino real 433, PORTAL DEL HUAJUCO","Carretera Nacional #5000 Oficina 502 Quinto piso, LA ESTANZUELA","JUNCO DE LA VEGA 2209 INT. 1101, ENTRE PIRINEOS Y PEDRO AMPUDIA","bahia dorada 3812, LA PRIMAVERA","Lago Ontario 6712, Lagos del Bosque","CASCADA 110 LAS ESTANCIAS","privada casa blanca #800, EL URO","Tabaqueros 107, Cd Satelite, CIUDAD SATÉLITE","Av. Fernando García Roel S/N Esquina con Junco de la Vega, Ed. 3 Hab 824","Rio Sta Catarina 3804 Colonia: Villa del Rio","Jazmines 5469, DEL PASEO RESIDENCIAL","Rio Nazas 758, JARDINES ROMA","Cerro de Picachos 2985, Mirador Residencial","Rio Nazas #1115 col. valle ote.","TABACHIN NO 401, LOS COLORINES","GALEANA 611, ENTRE NARANJO Y TREVIÑO","AVENIDA JOSE CALDERÓN A., JESÚS M GARZA","Av. Lazaro Cardenas num. ext. 2400 int. B71 Edificio Losoles, RESIDENCIAL SAN AGUSTIN 1 SECTOR","Av. Terrasol # 106, VILLAS DE TERRASOL","Junipero Serra 119, Capistrano","Rio Colorado 301, Apartment 04","Bosques de los Alpes 226, BOSQUES DEL VALLE 2DO SECTOR","Prolongaciòn Padre Mier 1200-17 Mision del Valle 3, MISIÓN DEL VALLE","B. de tahiti 530 colonia Bosques del valle, BOSQUES DEL VALLE 1ER SECTOR","JOSE CLEMENTE OROZCO 329, COLONIA VALLE ORIENTE SUR","Río Guadalquivir 422 Del Valle, DEL VALLE","Treviño 416, sur, Col. Palo Blanco","Fco. Pizarro #127 Col. Mirasierra","AV. LAZARO CARDENAS NO. 2400 EDIFICIO LOSOLES, DESPACHO A-34, RESIDENCIAL SAN AGUSTIN 1 SECTOR","Independencia 126, col centro San Pedro.","MONTES CELESTES 410, RESIDENCIAL SAN AGUSTIN 1 SECTOR","Calle Santa Barbara #590, Int. 2, DEL VALLE SECT ORIENTE","RIO MISSISSIPPI OTE. 338, DEL VALLE","Humberto Lobo #501 Nte., empresa DICOASA, DEL VALLE","Junipero Serra 113 Colonia Capistrano, CAPISTRANO","Pedro de Valdivia 110 A col mirasierra","Matancillas 103 PTE, PRADOS DE LA SIERRA","Via Latina 204 A col. Fuentes del Valle, DEL VALLE","calzada del valle 472 col del valle, DEL VALLE","Guadalquivir 500 pte, DEL VALLE","Rio de la Plata 115, DEL VALLE","Reforma 402 PTE, SAN PEDRO","Porfirio Diaz 513, SAN PEDRO","Rio Colorado 301, Apartment 04","Bosques de Pirineos 208","Mar Arábigo 8231, LOMA LINDA","Los cenizos 5305, CUMBRESCONDIDO","insurgentes 4017","Falcon 912, Cumbres 2 sector","Calzada San Pedro #112, interior 17, MIRAVALLE","Boulevard Diaz Ordaz km 333, Torre 1 General Electric Piso 1, SAN PEDRO","Cerrada Escalante 115, colonia Cerradas de Cumbres, CERRADAS DE CUMBRES","Cumbres De Alborán 106 Col. Cumbres Elite 8o. Sector, C.P. 64349","Abedul 5409, VALLE VERDE 1 SECTOR","Paseo de los Leones #2837, LAS CUMBRES 3 SECTOR","Jean Paul Sartre 116, MISIÓN DE SAN JERÓNIMO","Camino de los Tzenzontles #533, SAN JEMO","Blvd. Diaz Ordaz Km. 3.33, SAN PEDRO","paseo de los conquistadores 605-A, LAS CUMBRES 3 SECTOR","Paseo valencia 323, paseo de cumbres, PASEO DE CUMBRES","Río mississipi 325 colonia paseo de cumbres, PASEO DE CUMBRES","Blvd. Antonio L. Rodriguez #1882  Int #104, SANTA MARÍA","Perpiñán 106, BOSQUES DE LAS CUMBRES","Edwin Aldrin #2940 col cumbres 5 sector, LAS CUMBRES","Venecia 900, LAS CUMBRES 3 SECTOR","Blv. Diaz Ordaz Km 3.3 L-1, (Corporativo AXTEL), SAN PEDRO","Paseo de los Descubridores #727 Cumbres Tercer Sector, LAS CUMBRES 3 SECTOR","Blvd. Constitución 3098, Piso 4, SANTA MARÍA","Rio San Juan 218, Col. Miravalle","El Darién 4765, VILLA MITRAS","boston 420 kennedy, KENNEDY","Pablo Moncayo 135, Int 11, COLINAS DE SAN JERÓNIMO","JARDINES DE SAN JERONIMO 218, DEPT. 4C. (TORRE VISUM), SAN JERÓNIMO","Gabriel García Márquez #210, COLINAS DE SAN JERÓNIMO","Boulevard Diaz Ordaz 333 Edificio Neoris Pso 1 Unidad San Pe, SAN PEDRO","Fedor Dostoievski 1340, Colinas de San Jeronimo","Paseo atenas 311, PASEO DE CUMBRES","Parque Nacional #226, BARRIO DEL PARQUE","Colina Blanca 3105, COLINAS DEL VALLE","Colina Alegre 3106, COLINAS DEL VALLE","ocotlan 4632 colonia los altos","Jean Racine #1532, COLINAS DE SAN JERÓNIMO","Juan José Hinojosa 5109 Valle Verde Tercer Sector","Calle V numero 429_9, SAN JERÓNIMO","DAVID ALFARO SIQUEIROS 6213 COL. CUMBRES QUINTA REAL","Misión de San Jacinto 7B, Jardines Coloniales","Calzada del Valle Ote 605 (Vasconcelos entre Olmos y Ebanos), VALLE DE SANTA ENGRACIA","Privada poniente 408, LA COOPERATIVA","Monte Aventino #249, Col. Fuentes del Valle","Roberto garza sada 301b san pedro garza garcia, LOMAS DEL VALLE","VIGO 214, LAS SENDAS GALICIAS","2 de Abril #341, Centro de San Pedro","Manuel Doblado Sur 306, SAN PEDRO","RIO VOLGA OTE 207 COL. DEL VALLE, ENTRE TAMAZUNCHALE Y MOCTEZUMA","olmos 715, colonial de la sierra","Hermenegildo Galeana 216, LA MONTAÑA","La Gloria No. 220, Colonia Hacienda El Rosario, HACIENDA EL ROSARIO","Nestor garcia 119, LÁZARO GARZA AYALA","230 Nispero  Col. Valle del Campestre","Rio Tamazunchale 201, DEL VALLE","Puebla 1203,Col.Palo Blanco","Rio Rhin 732, Col. del Valle","San Isidro 617 col la jolla, DEL VALLE","Lazaro cardenas 1007, RESIDENCIAL SANTA BÁRBARA 1 SECTOR","Diamante 101 Pedregal del Valle, PEDREGAL DEL VALLE","Los Pinos 706, Los Sauces 2do Sector","Av. Alfonso Reyes #223 Torre 6 Departamento 5, JERÓNIMO SILLER","San Jose 104-3, Col. Residencial Santa Barbara, RESIDENCIAL SANTA BÁRBARA 1 SECTOR","Lazaro cardenas 1007, RESIDENCIAL SANTA BÁRBARA 1 SECTOR","Privada gruta 211 Colonia Veredalta","Roberto Garza Sada 202, COLINAS DE LA SIERRA MADRE","Lazaro cardenas 1007, RESIDENCIAL SANTA BÁRBARA 1 SECTOR","Sauces #209 Col. Colonial de la Sierra","Bavaria 2841","Hidalgo 380 Pte. Centro","HACIENDA COYOACAN 4136, RESIDENCIAL LA HACIENDA","PASEO LOYOLA  5528, LOMAS DEL PASEO 1 SECTOR","Av. Revolución 831 sur local 4-A, JARDÍN ESPAÑOL","Lago de chapala 6831,, LAGOS DEL BOSQUE","Puerto Soledad 5403, Brisas","Valle primavera 2996, VALLE PRIMAVERA","Av. Morones Prieto 1500-501, NUEVAS COLONIAS","camino de la montaña, 6131, CORTIJO DEL RÍO 3 SECTOR","José Alvarado #1797 Dpto. 11-B, Jardín Español","PRIVADA BOCANEGRA 606 INT 13, VILLAS TEC TORRE ALFA","Cabo San Lucas 3984 Rincon de la primavera","CRISOL GRIS 313 COL. CENTRIKA CRISOLES","Bugambilias 5409 Col Del Paseo Residencial, DEL PASEO RESIDENCIAL","Ave. Constitución 1881 Poniente Col. Obispado, Planta baja interior 14. Centro Médico de la Mujer","Paseo del Acueducto 9919-2 Hacienda Santa Lucia","Asturias #3417, TORREMOLINOS","Plaza California 1033, LAS PLAZAS","Lago de chapala #290, ROMA","JUNCO DE LA VEGA 2401 C","Paseo de los laureles 5224 Del paseo residencial","Filosofos 316 Dep 10, TECNOLÓGICO","jose ortega #1726, JARDÍN ESPAÑOL","florencio antillon 1248-32, CONDOMINIOS CONSTITUCIÓN","Tabasco #728, INDEPENDENCIA","Palermo 6030 Dep 7, SATÉLITE 6 SECTOR ACUEDUCTO","Residencias V Hab. #209 Avenida Eugenio Garza Sada #2501 Sur, INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE MONTERREY","Jabatos 3317 e Independiente, Fracc Estadio, ESTADIO","Tabasco #728, INDEPENDENCIA","Lyon 5125 Las Torres, LAS TORRES","Washington 629 Ote., MONTERREY CENTRO","7 avenida 612 jardines de Anáhuac 3 sector","Prudencia #137,  COL. Prados de Santo Domingo","Aquiles Serdán #127, SANTA MARIA","paseo de los morales 101, residencial los morales","Pepe Guizar #216 Col. Lomas del Roble","Calle Sierra Tarahumara 702 (entre Popocatépetl y Encantada, LAS PUENTES SECTOR 6","Mina de Estaño #229, La estancia","cerrada 3 416, cerradas del roble","privada Jorge A. Treviño 109, col. Riberas de san nicolas","Teatro 801 Col- Hacienda Los Morales, HACIENDA LOS MORALES SECTOR 1","Vietnam 103, Colonia Futuro Nogalar, FUTURO NOGALAR SECTOR 2","MIRLO 105 COL CUAUHTEMOC, CUAUHTÉMOC SECTOR 2","Rio la silla #102. Col mirasur, MIRA SUR","Montañas #200 Colonia Villas de Anahuac Sector Alpes 3","Saltillo 930A, CHAPULTEPEC","Onix 116 Nexxus Zafiro, NEXXUS RESIDENCIAL SECTOR ZAFIRO","Jose Alfredo Jimenez #205, LOMAS DEL ROBLE SECTOR 1","Diego Rivera #115 B Col. Jardines de San Nicolas, JARDINES DE SAN NICOLÁS","Lago Coatetelco #210, DEL LAGO SECTOR 1","general teran 306, SAN NICOLÁS DE LOS GARZA CENTRO","Bosque de México #905, BOSQUES DE LINDAVISTA SECTOR DIAMANTE","Montañas Rocallosas #415, VILLA ESPERANZA","Encinos #615, HACIENDA LOS MORALES SECTOR 1","Calle Rincón del Valle 118, RINCÓN DE ANÁHUAC","Colonia Hacienda Los Morales, HACIENDA LOS MORALES SECTOR 1","Angus 1283 Col Hacienda los Morales, HACIENDA LOS MORALES SECTOR 1","Hacienda la Luz #102, HACIENDA LAS FUENTES","Peral 316, ARBOLEDAS DEL MEZQUITAL","pedro cervantes 125, jardines de san nicolas","Sierra De Gudar 1514 Las Puentes, LAS PUENTES SECTOR 15","Casa del Marquesado 1110, CASA BELLA SECTOR 1","Higuera 506, col getsemani ,","Av. Las Torres #611, VILLAZUL","Comitan #  3824, Residencial A.Lincoln","Monte Negro #8954, SAN BERNABE","Avenida Zapopan# 283B Depa10B Cumbres 3 sector, LAS CUMBRES 3 SECTOR","TAMESIS 139, CUMBRE ALLEGRO","Alfredo Perez #5130, Valle Verde 3er Sector","Cerro de la loma 5280, VALLE DE LAS CUMBRES","El Darien 4841 col. Villa Mitras","Priv. Las Villas 157, REAL DE CUMBRES","Paraguay 102 (taller mecanico Master Frenos)","Federico Chopin, 101, COLINAS DE SAN JERÓNIMO","Sahuaro norte 101, CERRADAS DE CUMBRES","Sebastian de Ocampo #2826, LAS CUMBRES","INGLATERRA 2891, BALCONES DEL CARMEN","PRIVADA RODEO 430, REAL DE CUMBRES","Camino de los faisanes #221 Col. San Jemo, SAN JEMO 1 SECTOR","Loma florida 2140-6., LOMA LARGA","callejon de la piedra 207, LAS LAJAS","PINON 1406, Mision Canterias","Rayon Sur #480, Col Centro. Universidad Regiomontana,, Depto TI.   Acceso por estacionamiento Rayon.   Ext. 3078","Pamplona 249, BOSQUES DE LAS CUMBRES","Leonardo Da Vinci 216, CUMBRES RENACIMIENTO","Cuatrocienegas 1723, MITRAS CENTRO","Mar Negro #8440, LOMA LINDA","Ave del paraiso #5829, VALLE VERDE 2 SECTOR","DR CANTU 2760 INTERIOR PISO 6 NÙMERO INTERIOR 608, LOS DOCTORES","Ave. del Parque #145, Segundo Sector, CUMBRES LE FONTAINE","Herbert G. Wells #67, Colinas de San Jerónimo","Nueva Inglaterra 4241, RESIDENCIAL ABRAHAM LINCOLN","constituyentes del 57 #2712, FRANCISCO I MADERO","Misión de la Cruz #5364, Col. Misión Cumbres, MISIÓN DE LAS CUMBRES","Paseo Atenas 123, Paseo de Cumbres","Andria 5246 rincon de santa cecilia, RINCÓN SANTA CECILIA"]

// let exp1 = /([^,]+) (\d+) ([^,]+)/;
// let exp2 = /([^,]+) (\d+) ([^,]+)/;
//
// let nullAddresses1 = addresses.filter(row => {
//   let result = exp1.exec(row.replace('#','').replace(',', ' ').replace(/(\d+[a-zA-Z])/, (match, p1,p2,p3, offset, string) => p1.replace(/[a-zA-Z]/, '')));
//
//   console.log(result);
//   console.log('-------------------------------------')
//   result === null;
// });
//
// console.log(nullAddresses1.length);

// exp1.exec(adr.replace('#','').replace(',', ' ').replace(/(\d+[a-zA-Z])/, (match, p1,p2,p3, offset, string) => p1.replace(/[a-zA-Z]/, ''))) === null;

let exp1 = /(\b[^,]+\b)/g
// let addr = addresses[1];
// let result = addr.match(exp1)
// console.log(result[0])
// console.log(result[1])

let nullAddresses1 = addresses.filter(row => {
  let result = row.match(exp1)
  console.log(row);
  console.log(result);
  console.log('-------------------------------------')
  result === null;
});
console.log(nullAddresses1.length);
