const communes =
[
    "Ouagadougou (ou Ouaga)",
    "Bobo-Dioulasso (ou Bobo Dioulasso)",
    "Banfora",
    "Dédougou",
    "Dori",
    "Fada N’Gourma",
    "Gaoua",
    "Kaya",
    "Koudougou",
    "Manga",
    "Ouahigouya",
    "Tenkodogo",
    "Ziniaré",
    "Batié",
    "Bogandé",
    "Boromo",
    "Boulsa",
    "Boussé",
    "Dano",
    "Diapaga",
    "Diébougou",
    "Djibo",
    "Gayéri",
    "Gorom-Gorom",
    "Gourcy",
    "Houndé",
    "Kombissiri",
    "Kongoussi",
    "Koupéla",
    "Léo",
    "Nouna",
    "Orodara",
    "Ouargaye",
    "Pama",
    "Pô",
    "Réo",
    "Sapouy",
    "Sebba",
    "Sindou",
    "Solenzo",
    "Titao",
    "Toma",
    "Tougan",
    "Yako",
    "Zorgho",
    "Bitou (ou Bittou)",
    "Garango",
    "Niangoloko",
    "Pouytenga",
    "Absouya",
    "Andemtenga",
    "Arbinda",
    "Arbollé (ou Arbolé)",
    "Bagaré",
    "Bagassi",
    "Bagré",
    "Bakata",
    "Balavé",
    "Bama",
    "Bana",
    "Bané",
    "Banh",
    "Bani",
    "Banzon",
    "Baraboulé",
    "Barani",
    "Barga",
    "Barsalogho",
    "Bartiébougou (ou Barthiébougou, Bartibougou)",
    "Baskouré",
    "Bassi",
    "Béguédo",
    "Békuy",
    "Béré",
    "Béréba",
    "Bérégadougou",
    "Biéha",
    "Bilanga",
    "Bindé",
    "Bingo",
    "Bissiga",
    "Boala",
    "Bokin",
    "Bomborokuy",
    "Bondigui",
    "Bondokuy",
    "Boni",
    "Botou",
    "Boudry",
    "Bougnounou",
    "Boundoré",
    "Boura",
    "Bourasso",
    "Bouroum",
    "Bouroum-Bouroum",
    "Bourzanga",
    "Bousséra",
    "Boussou",
    "Boussoukoula",
    "Boussouma (Boulgou)",
    "Boussouma (Sanmatenga)",
    "Cassou",
    "Coalla",
    "Comin-Yanga",
    "Dablo",
    "Dakoro",
    "Dalo",
    "Dandé",
    "Dapélogo",
    "Dargo",
    "Dassa",
    "Déou",
    "Di",
    "Diabo",
    "Dialgaye",
    "Diapangou",
    "Didyr",
    "Diguel",
    "Dissin",
    "Djibasso",
    "Djigoué",
    "Djigouéra",
    "Dokuy",
    "Dolo",
    "Doulougou",
    "Doumbala",
    "Douna",
    "Douroula",
    "Dourtenga",
    "Falagountou",
    "Fara",
    "Faramana",
    "Fô",
    "Founzan",
    "Foutouri",
    "Gao",
    "Gaongo",
    "Gassan (ou Gassam)",
    "Gbomblora",
    "Godyr",
    "Gogo",
    "Gomboro",
    "Gomboussougou",
    "Gomponsom",
    "Gorgadji",
    "Gossina",
    "Gounghin",
    "Guéguéré",
    "Guiaro",
    "Guiba",
    "Guibaré",
    "Imasgo",
    "Iolonioro",
    "Ipelcé",
    "Kaïn",
    "Kalsaka",
    "Kampti",
    "Kando",
    "Kangala",
    "Kankalaba",
    "Kantchari",
    "Karangasso-Sambla (ou Karankasso-Sambla)",
    "Karangasso-Vigué (ou Karankasso-Vigué)",
    "Kassoum",
    "Kayan",
    "Kayao",
    "Kelbo",
    "Kiembara",
    "Kindi",
    "Kirsi",
    "Kogho",
    "Kokologho (ou Kokologo)",
    "Koloko",
    "Kombori",
    "Komki-Ipala",
    "Kompienga",
    "Komsilga",
    "Komtoèga",
    "Kona",
    "Koper",
    "Kordié",
    "Korsimoro",
    "Kossouka",
    "Koti",
    "Koubri",
    "Kougny",
    "Kouka",
    "Koumbia",
    "Koumbri",
    "Koundougou",
    "Kourinion (ou Kourignon)",
    "Kourouma",
    "Koutougou",
    "Kpuéré",
    "Kyon",
    "Lâ-Todin",
    "Lalgaye",
    "Lanfièra",
    "Lankoué",
    "Laye",
    "Léba",
    "Legmoin",
    "Léna",
    "Liptougou",
    "Logobou",
    "Loropéni",
    "Loumana",
    "Loumbila",
    "Madjoari",
    "Madouba",
    "Malba",
    "Mané",
    "Mangodara",
    "Manni",
    "Mansila",
    "Markoye",
    "Matiacoali",
    "Méguet",
    "Midebdo (ou Midèbdo)",
    "Mogtédo",
    "Morolaba",
    "Moussodougou",
    "N’Dorola",
    "Nagbingou",
    "Nagréongo",
    "Nako",
    "Namissiguima (Sanmatenga)",
    "Namissiguima (Yatenga)",
    "Namounou",
    "Nandiala",
    "Nanoro",
    "Nasséré",
    "Nassoumbou",
    "Nébiélianayou",
    "Niabouri",
    "Niankorodougou",
    "Niaogho (ou Niaogo)",
    "Niégo",
    "Niou",
    "Nobéré",
    "Oronkua",
    "Ouarkoye",
    "Ouéléni",
    "Ouessa",
    "Ouindigui",
    "Oula",
    "Ouo",
    "Ourgou-Manéga",
    "Oursi",
    "Oury",
    "Pâ",
    "Pabré",
    "Padéma",
    "Partiaga",
    "Pella",
    "Péni",
    "Pensa",
    "Périgban (ou Pérignan)",
    "Pibaoré",
    "Piéla",
    "Pilimpikou",
    "Pissila",
    "Poa",
    "Pobé-Mengao",
    "Pompoï",
    "Pouni",
    "Poura",
    "Rambo",
    "Ramongo",
    "Rollo",
    "Rouko",
    "Saaba",
    "Sabcé",
    "Sabou",
    "Safané",
    "Salogo",
    "Samba",
    "Sami",
    "Samogohiri",
    "Samorogouan",
    "Sampelga",
    "Sanaba",
    "Sangha (ou Sanga)",
    "Saponé",
    "Satiri",
    "Séguénéga",
    "Seytenga",
    "Siby",
    "Sidéradougou",
    "Siglé",
    "Silly",
    "Sindo",
    "Soaw",
    "Solhan",
    "Sollé",
    "Sono",
    "Soubakaniédougou",
    "Soudougui",
    "Sourgou",
    "Sourgoubila",
    "Tambaga",
    "Tangaye",
    "Tanghin-Dassouri",
    "Tankougounadié",
    "Tansarga",
    "Tansila",
    "Tchériba",
    "Ténado",
    "Tensobentenga",
    "Thion",
    "Thiou",
    "Thyou",
    "Tiankoura",
    "Tibga",
    "Tiébélé",
    "Tiéfora",
    "Tikaré",
    "Tin-Akoff",
    "Titabé",
    "Tô",
    "Toécé",
    "Toéghin",
    "Toéni",
    "Tongomayel",
    "Tougo",
    "Tougouri",
    "Toussiana",
    "Wolonkoto",
    "Yaba",
    "Yaho",
    "Yalgo",
    "Yamba",
    "Yargatenga",
    "Yargo",
    "Yé",
    "Yondé",
    "Zabré",
    "Zam",
    "Zambo",
    "Zamo",
    "Zawara",
    "Zecco",
    "Zéguédéguin",
    "Ziga",
    "Zimtenga (ou Zimtanga)",
    "Ziou",
    "Zitenga",
    "Zoaga",
    "Zogoré",
    "Zonsé",
    "Zoungou"
]

export default communes;