import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsPolygon } from 'ionic-native';

/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  private _latitude: number;
  private _longitude: number;

  //relação de pontos das cidades:
  private brejoes = [
    new GoogleMapsLatLng(-13.0620887, -39.7643281), new GoogleMapsLatLng(-13.0192768, -39.8185731), new GoogleMapsLatLng(-12.9784647, -39.8075868),
    new GoogleMapsLatLng(-12.9336307, -39.9023438), new GoogleMapsLatLng(-12.9938537, -39.9510957), new GoogleMapsLatLng(-13.0413526, -39.9662019),
    new GoogleMapsLatLng(-13.075466, -39.9593354), new GoogleMapsLatLng(-13.0941928, -39.9613954), new GoogleMapsLatLng(-13.1169307, -39.9353028),
    new GoogleMapsLatLng(-13.1664118, -39.9250031), new GoogleMapsLatLng(-13.1898115, -39.8934174), new GoogleMapsLatLng(-13.19048, -39.8336793),
    new GoogleMapsLatLng(-13.1884745, -39.8096468), new GoogleMapsLatLng(-13.1898115, -39.799347), new GoogleMapsLatLng(-13.1764405, -39.801407),
    new GoogleMapsLatLng(-13.1510336, -39.8000337), new GoogleMapsLatLng(-13.164406, -39.7773744), new GoogleMapsLatLng(-13.1764403, -39.7670751),
    new GoogleMapsLatLng(-13.1898115, -39.7622682), new GoogleMapsLatLng(-13.1804519, -39.7554017), new GoogleMapsLatLng(-13.1463531, -39.7615815),
    new GoogleMapsLatLng(-13.1336484, -39.7622682), new GoogleMapsLatLng(-13.1196056, -39.7437287), new GoogleMapsLatLng(-13.1202743, -39.7320558),
    new GoogleMapsLatLng(-13.1042245, -39.7313691), new GoogleMapsLatLng(-13.0895113, -39.6963502), new GoogleMapsLatLng(-13.0620887, -39.7643281)
  ];
  private santaInes = [
    new GoogleMapsLatLng(-13.1898115, -39.799347), new GoogleMapsLatLng(-13.1884745, -39.8096468), new GoogleMapsLatLng(-13.1898115, -39.8934174),
    new GoogleMapsLatLng(-13.1898108, -39.969635), new GoogleMapsLatLng(-13.208529, -39.9490356), new GoogleMapsLatLng(-13.2252404, -39.9311829),
    new GoogleMapsLatLng(-13.2359351, -39.9147034), new GoogleMapsLatLng(-13.2519763, -39.9126434), new GoogleMapsLatLng(-13.2620015, -39.9140167),
    new GoogleMapsLatLng(-13.3241486, -39.9819946), new GoogleMapsLatLng(-13.3294938, -39.9517822), new GoogleMapsLatLng(-13.3902876, -39.8982239),
    new GoogleMapsLatLng(-13.3375114, -39.8261261), new GoogleMapsLatLng(-13.3562182, -39.7911072), new GoogleMapsLatLng(-13.3856117, -39.7657013),
    new GoogleMapsLatLng(-13.3755916, -39.7485352), new GoogleMapsLatLng(-13.3475331, -39.752655), new GoogleMapsLatLng(-13.3341708, -39.7595215),
    new GoogleMapsLatLng(-13.3161305, -39.754715), new GoogleMapsLatLng(-13.2853921, -39.7657013), new GoogleMapsLatLng(-13.2486345, -39.764328),
    new GoogleMapsLatLng(-13.2412823, -39.7725677), new GoogleMapsLatLng(-13.2412823, -39.7849274), new GoogleMapsLatLng(-13.2352667, -39.8020935),
    new GoogleMapsLatLng(-13.2198929, -39.8123932), new GoogleMapsLatLng(-13.2025126, -39.8110199), new GoogleMapsLatLng(-13.1898115, -39.799347),
  ];
  private novaItarana = [
    new GoogleMapsLatLng(-12.9336307, -399023438), new GoogleMapsLatLng(-12.9168988, -39.8989105), new GoogleMapsLatLng(-12.8807556, -39.8995972),
    new GoogleMapsLatLng(-12.9737802, -40.0163269), new GoogleMapsLatLng(-12.9891695, -40.0623322), new GoogleMapsLatLng(-12.993853, -40.1303101),
    new GoogleMapsLatLng(-12.9831477, -40.1447296), new GoogleMapsLatLng(-13.02329, -40.1715088), new GoogleMapsLatLng(-13.1129176, -40.1584625),
    new GoogleMapsLatLng(-13.1216111, -40.0849915), new GoogleMapsLatLng(-13.1129176, -40.0588989), new GoogleMapsLatLng(-13.1256234, -40.0465393),
    new GoogleMapsLatLng(-13.1356538, -40.033493), new GoogleMapsLatLng(-13.1436778, -40.0183868), new GoogleMapsLatLng(-13.1510329, -40.0012207),
    new GoogleMapsLatLng(-13.1603936, -39.9998474), new GoogleMapsLatLng(-13.1690854, -39.9847412), new GoogleMapsLatLng(-13.1898108, -39.969635),
    new GoogleMapsLatLng(-13.1898115, -39.8934174), new GoogleMapsLatLng(-13.1664118, -39.9250031), new GoogleMapsLatLng(-13.1169307, -39.9353028),
    new GoogleMapsLatLng(-13.0941928, -39.9613954), new GoogleMapsLatLng(-13.075466, -39.9593354), new GoogleMapsLatLng(-13.0413526, -39.9662019),
    new GoogleMapsLatLng(-12.9938537, -39.9510957), new GoogleMapsLatLng(-12.9336307, -39.9023438),

  ];
  private irajuba = [
    new GoogleMapsLatLng(-40.1584625, -13.1129176),
    new GoogleMapsLatLng(-40.120697, -13.2760361),
    new GoogleMapsLatLng(-39.9819946, -13.3241486),
    new GoogleMapsLatLng(-39.9140167, -13.2620015),
    new GoogleMapsLatLng(-39.9126434, -13.2519763),
    new GoogleMapsLatLng(-39.9147034, -13.2359351),
    new GoogleMapsLatLng(-39.9311829, -13.2252404),
    new GoogleMapsLatLng(-39.969635, -13.1898108),
    new GoogleMapsLatLng(-39.9847412, -13.1690854),
    new GoogleMapsLatLng(-39.9998474, -13.1603936),
    new GoogleMapsLatLng(-40.0012207, -13.1510329),
    new GoogleMapsLatLng(-40.0183868, -13.1436778),
    new GoogleMapsLatLng(-40.033493, -13.1356538),
    new GoogleMapsLatLng(-40.0465393, -13.1256234),
    new GoogleMapsLatLng(-40.0588989, -13.1129176),
    new GoogleMapsLatLng(-40.0849915, -13.1216111),
    new GoogleMapsLatLng(-40.1584625, -13.1129176),
  ];
  private cravolandia = [
    new GoogleMapsLatLng(-39.8982239, -13.3902876),
    new GoogleMapsLatLng(-39.8529053, -13.4370416),
    new GoogleMapsLatLng(-39.8412323, -13.4450556),
    new GoogleMapsLatLng(-39.8316193, -13.4443878),
    new GoogleMapsLatLng(-39.8075867, -13.4517338),
    new GoogleMapsLatLng(-39.7911072, -13.4624185),
    new GoogleMapsLatLng(-39.7911072, -13.5318574),
    new GoogleMapsLatLng(-39.7677612, -13.5171701),
    new GoogleMapsLatLng(-39.7478485, -13.5071555),
    new GoogleMapsLatLng(-39.7279358, -13.5038172),
    new GoogleMapsLatLng(-39.710083, -13.5191729),
    new GoogleMapsLatLng(-39.6949768, -13.5171701),
    new GoogleMapsLatLng(-39.7032166, -13.5078231),
    new GoogleMapsLatLng(-39.710083, -13.4984758),
    new GoogleMapsLatLng(-39.7251892, -13.4917989),
    new GoogleMapsLatLng(-39.7396088, -13.4844542),
    new GoogleMapsLatLng(-39.7485352, -13.4751059),
    new GoogleMapsLatLng(-39.7505951, -13.4584118),
    new GoogleMapsLatLng(-39.7389221, -13.4477269),
    new GoogleMapsLatLng(-39.7540283, -13.4357059),
    new GoogleMapsLatLng(-39.7423553, -13.4243521),
    new GoogleMapsLatLng(-39.7499084, -13.4043147),
    new GoogleMapsLatLng(-39.7602081, -13.3969673),
    new GoogleMapsLatLng(-39.7657013, -13.3856117),
    new GoogleMapsLatLng(-39.7911072, -13.3562182),
    new GoogleMapsLatLng(-39.8261261, -13.3375114),
    new GoogleMapsLatLng(-39.8982239, -13.3902876),
  ]
  private itaquara = [
    new GoogleMapsLatLng(-39.7911072, -13.5318574),
    new GoogleMapsLatLng(-39.7911072, -13.4624185),
    new GoogleMapsLatLng(-39.8075867, -13.4517338),
    new GoogleMapsLatLng(-39.8316193, -13.4443878),
    new GoogleMapsLatLng(-39.8412323, -13.4450556),
    new GoogleMapsLatLng(-39.8529053, -13.4370416),
    new GoogleMapsLatLng(-39.8982239, -13.3902876),
    new GoogleMapsLatLng(-39.9517822, -13.3294938),
    new GoogleMapsLatLng(-39.9819946, -13.3241486),
    new GoogleMapsLatLng(-39.9799347, -13.3381796),
    new GoogleMapsLatLng(-39.9840546, -13.3441926),
    new GoogleMapsLatLng(-39.9758148, -13.3635669),
    new GoogleMapsLatLng(-39.9758148, -13.3795997),
    new GoogleMapsLatLng(-39.9916077, -13.4036468),
    new GoogleMapsLatLng(-39.992981, -13.4243521),
    new GoogleMapsLatLng(-40.0005341, -13.4296951),
    new GoogleMapsLatLng(-39.9991608, -13.463754),
    new GoogleMapsLatLng(-39.938736, -13.4944697),
    new GoogleMapsLatLng(-39.9133301, -13.4804478),
    new GoogleMapsLatLng(-39.8989105, -13.4811156),
    new GoogleMapsLatLng(-39.861145, -13.5578917),
    new GoogleMapsLatLng(-39.8144531, -13.573244),
    new GoogleMapsLatLng(-39.7911072, -13.5318574),

  ];
  private planaltino = [
    new GoogleMapsLatLng(-40.1715088, -13.02329),
    new GoogleMapsLatLng(-40.4159546, -13.0941921),
    new GoogleMapsLatLng(-40.3946686, -13.1356538),
    new GoogleMapsLatLng(-40.382309, -13.1403345),
    new GoogleMapsLatLng(-40.4942322, -13.1911478),
    new GoogleMapsLatLng(-40.4084015, -13.3047711),
    new GoogleMapsLatLng(-40.2772522, -13.3455288),
    new GoogleMapsLatLng(-40.2848053, -13.340852),
    new GoogleMapsLatLng(-40.2854919, -13.3201396),
    new GoogleMapsLatLng(-40.271759, -13.2860603),
    new GoogleMapsLatLng(-40.2614594, -13.2840555),
    new GoogleMapsLatLng(-40.2442932, -13.2880651),
    new GoogleMapsLatLng(-40.2188873, -13.310785),
    new GoogleMapsLatLng(-40.2030945, -13.3141259),
    new GoogleMapsLatLng(-40.1763153, -13.3335027),
    new GoogleMapsLatLng(-40.153656, -13.3448607),
    new GoogleMapsLatLng(-40.1049042, -13.3355071),
    new GoogleMapsLatLng(-40.1131439, -13.318135),
    new GoogleMapsLatLng(-40.120697, -13.2760361),
    new GoogleMapsLatLng(-40.1584625, -13.1129176),
    new GoogleMapsLatLng(-40.1715088, -13.02329),

  ];
  private itirucu = [
    new GoogleMapsLatLng(-40.1049042, -13.3355071),
    new GoogleMapsLatLng(-40.153656, -13.3448607),
    new GoogleMapsLatLng(-40.1564026, -13.3622308),
    new GoogleMapsLatLng(-40.207901, -13.3896196),
    new GoogleMapsLatLng(-40.2230072, -13.3922915),
    new GoogleMapsLatLng(-40.2353668, -13.4043147),
    new GoogleMapsLatLng(-40.2278137, -13.4216805),
    new GoogleMapsLatLng(-40.2140808, -13.430363),
    new GoogleMapsLatLng(-40.2099609, -13.4410486),
    new GoogleMapsLatLng(-40.2236938, -13.4530694),
    new GoogleMapsLatLng(-40.2367401, -13.4604151),
    new GoogleMapsLatLng(-40.2381134, -13.4690962),
    new GoogleMapsLatLng(-40.2236938, -13.4731027),
    new GoogleMapsLatLng(-40.2085876, -13.4811156),
    new GoogleMapsLatLng(-40.1701355, -13.5612292),
    new GoogleMapsLatLng(-40.1673889, -13.5812535),
    new GoogleMapsLatLng(-40.1680756, -13.6019434),
    new GoogleMapsLatLng(-40.1598358, -13.6232988),
    new GoogleMapsLatLng(-40.1488495, -13.6419832),
    new GoogleMapsLatLng(-40.1406097, -13.6499904),
    new GoogleMapsLatLng(-40.1165771, -13.6740102),
    new GoogleMapsLatLng(-40.0980377, -13.6680055),
    new GoogleMapsLatLng(-40.1042175, -13.6586645),
    new GoogleMapsLatLng(-40.109024, -13.6466541),
    new GoogleMapsLatLng(-40.1138306, -13.6306393),
    new GoogleMapsLatLng(-40.1165771, -13.6166254),
    new GoogleMapsLatLng(-40.1124573, -13.6019434),
    new GoogleMapsLatLng(-40.111084, -13.5852581),
    new GoogleMapsLatLng(-40.1193237, -13.5659017),
    new GoogleMapsLatLng(-40.1158905, -13.5278518),
    new GoogleMapsLatLng(-40.1076508, -13.5218434),
    new GoogleMapsLatLng(-40.0733185, -13.4831187),
    new GoogleMapsLatLng(-40.1097107, -13.4363737),
    new GoogleMapsLatLng(-40.1049042, -13.3355071),

  ];
  private jequie = [
    new GoogleMapsLatLng(-40.0980377, -13.6680055),
    new GoogleMapsLatLng(-40.1165771, -13.6740102),
    new GoogleMapsLatLng(-40.4818726, -13.6893549),
    new GoogleMapsLatLng(-40.4866791, -13.7026973),
    new GoogleMapsLatLng(-40.5038452, -13.707367),
    new GoogleMapsLatLng(-40.5354309, -13.7120366),
    new GoogleMapsLatLng(-40.5388641, -13.733382),
    new GoogleMapsLatLng(-40.5271912, -13.7887377),
    new GoogleMapsLatLng(-40.4969788, -13.8134101),
    new GoogleMapsLatLng(-40.4502869, -13.8547472),
    new GoogleMapsLatLng(-40.4372406, -13.8614138),
    new GoogleMapsLatLng(-40.4303741, -13.8507472),
    new GoogleMapsLatLng(-40.4173279, -13.8534139),
    new GoogleMapsLatLng(-40.4097748, -13.8480805),
    new GoogleMapsLatLng(-40.403595, -13.8534139),
    new GoogleMapsLatLng(-40.3788757, -13.8454137),
    new GoogleMapsLatLng(-40.3569031, -13.8427469),
    new GoogleMapsLatLng(-40.3232574, -13.8400801),
    new GoogleMapsLatLng(-40.3060913, -13.8474138),
    new GoogleMapsLatLng(-40.2882385, -13.8507472),
    new GoogleMapsLatLng(-40.2710724, -13.8527472),
    new GoogleMapsLatLng(-40.252533, -13.8600805),
    new GoogleMapsLatLng(-40.2456665, -13.8540806),
    new GoogleMapsLatLng(-40.2456665, -13.8454137),
    new GoogleMapsLatLng(-40.2360535, -13.8487471),
    new GoogleMapsLatLng(-40.2367401, -13.8627471),
    new GoogleMapsLatLng(-40.2319336, -13.8700801),
    new GoogleMapsLatLng(-40.2436066, -13.87208),
    new GoogleMapsLatLng(-40.2456665, -13.8794127),
    new GoogleMapsLatLng(-40.2559662, -13.906075),
    new GoogleMapsLatLng(-40.2600861, -13.875413),
    new GoogleMapsLatLng(-40.2703857, -13.8734132),
    new GoogleMapsLatLng(-40.2799988, -13.8627471),
    new GoogleMapsLatLng(-40.2916718, -13.8594139),
    new GoogleMapsLatLng(-40.304718, -13.8554139),
    new GoogleMapsLatLng(-40.3177643, -13.8527472),
    new GoogleMapsLatLng(-40.3369904, -13.8500805),
    new GoogleMapsLatLng(-40.34729, -13.8534139),
    new GoogleMapsLatLng(-40.3603363, -13.8567472),
    new GoogleMapsLatLng(-40.3699493, -13.8560806),
    new GoogleMapsLatLng(-40.3864288, -13.8594139),
    new GoogleMapsLatLng(-40.3981018, -13.8614138),
    new GoogleMapsLatLng(-40.4276276, -13.8674136),
    new GoogleMapsLatLng(-40.434494, -13.8794127),
    new GoogleMapsLatLng(-40.4482269, -13.87208),
    new GoogleMapsLatLng(-40.4949188, -13.8834122),
    new GoogleMapsLatLng(-40.5024719, -13.8920777),
    new GoogleMapsLatLng(-40.4956055, -13.8980766),
    new GoogleMapsLatLng(-40.5052185, -13.8980766),
    new GoogleMapsLatLng(-40.5052185, -13.9054085),
    new GoogleMapsLatLng(-40.5182648, -13.9180721),
    new GoogleMapsLatLng(-40.5141449, -13.9274027),
    new GoogleMapsLatLng(-40.3905487, -14.0599899),
    new GoogleMapsLatLng(-40.3610229, -14.0513307),
    new GoogleMapsLatLng(-40.34935, -14.0326792),
    new GoogleMapsLatLng(-40.3397369, -14.0220205),
    new GoogleMapsLatLng(-40.3225708, -14.0153585),
    new GoogleMapsLatLng(-40.316391, -14.0073639),
    new GoogleMapsLatLng(-40.3054047, -14.0100288),
    new GoogleMapsLatLng(-40.2497864, -14.0373422),
    new GoogleMapsLatLng(-40.2257538, -14.032013),
    new GoogleMapsLatLng(-40.2030945, -14.0386745),
    new GoogleMapsLatLng(-40.2044678, -14.0586577),
    new GoogleMapsLatLng(-40.2120209, -14.0813033),
    new GoogleMapsLatLng(-40.2264404, -14.1219265),
    new GoogleMapsLatLng(-40.1797485, -14.1239241),
    new GoogleMapsLatLng(-40.1694489, -14.1612108),
    new GoogleMapsLatLng(-40.1886749, -14.2264478),
    new GoogleMapsLatLng(-40.1584625, -14.2544007),
    new GoogleMapsLatLng(-40.1282501, -14.2410902),
    new GoogleMapsLatLng(-40.1186371, -14.2311069),
    new GoogleMapsLatLng(-40.1014709, -14.2577282),
    new GoogleMapsLatLng(-40.0987244, -14.2437524),
    new GoogleMapsLatLng(-40.0946045, -14.2337691),
    new GoogleMapsLatLng(-40.087738, -14.2231198),
    new GoogleMapsLatLng(-40.0849915, -14.2104731),
    new GoogleMapsLatLng(-40.0863647, -14.1964944),
    new GoogleMapsLatLng(-40.0939178, -14.1925003),
    new GoogleMapsLatLng(-40.1007843, -14.181849),
    new GoogleMapsLatLng(-40.0410461, -13.9980365),
    new GoogleMapsLatLng(-39.9977875, -14.0386745),
    new GoogleMapsLatLng(-39.9414825, -14.0759751),
    new GoogleMapsLatLng(-39.9188232, -14.061322),
    new GoogleMapsLatLng(-39.903717, -14.0280161),
    new GoogleMapsLatLng(-39.8892975, -14.0166909),
    new GoogleMapsLatLng(-39.9167633, -14.0080301),
    new GoogleMapsLatLng(-39.9497223, -13.9773817),
    new GoogleMapsLatLng(-40.0108337, -13.9187386),
    new GoogleMapsLatLng(-39.9243164, -13.8174108),
    new GoogleMapsLatLng(-39.7574615, -13.9813796),
    new GoogleMapsLatLng(-39.743042, -13.9420643),
    new GoogleMapsLatLng(-39.733429, -13.9294021),
    new GoogleMapsLatLng(-39.7093964, -13.919405),
    new GoogleMapsLatLng(-39.7265625, -13.9080746),
    new GoogleMapsLatLng(-39.752655, -13.8660803),
    new GoogleMapsLatLng(-39.7691345, -13.8674136),
    new GoogleMapsLatLng(-39.7842407, -13.8574139),
    new GoogleMapsLatLng(-39.7725677, -13.8347463),
    new GoogleMapsLatLng(-39.773941, -13.8194111),
    new GoogleMapsLatLng(-39.8123932, -13.7847365),
    new GoogleMapsLatLng(-39.8412323, -13.732715),
    new GoogleMapsLatLng(-39.8535919, -13.643985),
    new GoogleMapsLatLng(-39.8680115, -13.643985),
    new GoogleMapsLatLng(-39.9105835, -13.6766789),
    new GoogleMapsLatLng(-39.9421692, -13.6766789),
    new GoogleMapsLatLng(-39.9785614, -13.6646694),
    new GoogleMapsLatLng(-39.9936676, -13.6446523),
    new GoogleMapsLatLng(-40.012207, -13.6419832),
    new GoogleMapsLatLng(-40.0637054, -13.6453196),
    new GoogleMapsLatLng(-40.0980377, -13.6680055),
  ];
  private apuarema = [
    new GoogleMapsLatLng(-39.7948837, -13.800074),
    new GoogleMapsLatLng(-39.773941, -13.8194111),
    new GoogleMapsLatLng(-39.7725677, -13.8347463),
    new GoogleMapsLatLng(-39.7842407, -13.8574139),
    new GoogleMapsLatLng(-39.7691345, -13.8674136),
    new GoogleMapsLatLng(-39.752655, -13.8660803),
    new GoogleMapsLatLng(-39.7265625, -13.9080746),
    new GoogleMapsLatLng(-39.7176361, -13.9004095),
    new GoogleMapsLatLng(-39.7135162, -13.9147396),
    new GoogleMapsLatLng(-39.688797, -13.8904112),
    new GoogleMapsLatLng(-39.6805573, -13.8787461),
    new GoogleMapsLatLng(-39.6757507, -13.8704134),
    new GoogleMapsLatLng(-39.6702576, -13.8617471),
    new GoogleMapsLatLng(-39.6754074, -13.8574139),
    new GoogleMapsLatLng(-39.6990967, -13.8470804),
    new GoogleMapsLatLng(-39.6987534, -13.8374132),
    new GoogleMapsLatLng(-39.6946335, -13.825412),
    new GoogleMapsLatLng(-39.6884537, -13.8134101),
    new GoogleMapsLatLng(-39.6970367, -13.8020745),
    new GoogleMapsLatLng(-39.6973801, -13.7914051),
    new GoogleMapsLatLng(-39.6918869, -13.78507),
    new GoogleMapsLatLng(-39.7063065, -13.7730661),
    new GoogleMapsLatLng(-39.721756, -13.7804019),
    new GoogleMapsLatLng(-39.7245026, -13.7540586),
    new GoogleMapsLatLng(-39.7488785, -13.7710653),
    new GoogleMapsLatLng(-39.7735977, -13.7743999),
    new GoogleMapsLatLng(-39.7931671, -13.7860703),
    new GoogleMapsLatLng(-39.7948837, -13.800074),

  ];
  private jaguacara = [
    new GoogleMapsLatLng(-39.9819946, -13.3241486),
    new GoogleMapsLatLng(-40.120697, -13.2760361),
    new GoogleMapsLatLng(-40.1131439, -13.318135),
    new GoogleMapsLatLng(-40.1049042, -13.3355071),
    new GoogleMapsLatLng(-40.1097107, -13.4363737),
    new GoogleMapsLatLng(-40.0733185, -13.4831187),
    new GoogleMapsLatLng(-40.1076508, -13.5218434),
    new GoogleMapsLatLng(-40.1158905, -13.5278518),
    new GoogleMapsLatLng(-40.1193237, -13.5659017),
    new GoogleMapsLatLng(-40.111084, -13.5852581),
    new GoogleMapsLatLng(-40.1124573, -13.6019434),
    new GoogleMapsLatLng(-40.1165771, -13.6166254),
    new GoogleMapsLatLng(-40.1138306, -13.6306393),
    new GoogleMapsLatLng(-40.109024, -13.6466541),
    new GoogleMapsLatLng(-40.1042175, -13.6586645),
    new GoogleMapsLatLng(-40.0980377, -13.6680055),
    new GoogleMapsLatLng(-40.0637054, -13.6453196),
    new GoogleMapsLatLng(-40.012207, -13.6419832),
    new GoogleMapsLatLng(-39.9936676, -13.6446523),
    new GoogleMapsLatLng(-39.9785614, -13.6646694),
    new GoogleMapsLatLng(-39.9421692, -13.6766789),
    new GoogleMapsLatLng(-39.9105835, -13.6766789),
    new GoogleMapsLatLng(-39.8680115, -13.643985),
    new GoogleMapsLatLng(-39.8535919, -13.643985),
    new GoogleMapsLatLng(-39.8412323, -13.732715),
    new GoogleMapsLatLng(-39.8123932, -13.7847365),
    new GoogleMapsLatLng(-39.7948837, -13.800074),
    new GoogleMapsLatLng(-39.7931671, -13.7860703),
    new GoogleMapsLatLng(-39.7735977, -13.7743999),
    new GoogleMapsLatLng(-39.7488785, -13.7710653),
    new GoogleMapsLatLng(-39.7245026, -13.7540586),
    new GoogleMapsLatLng(-39.721756, -13.7804019),
    new GoogleMapsLatLng(-39.7063065, -13.7730661),
    new GoogleMapsLatLng(-39.6918869, -13.78507),
    new GoogleMapsLatLng(-39.6860504, -13.7774009),
    new GoogleMapsLatLng(-39.6757507, -13.7760671),
    new GoogleMapsLatLng(-39.6606445, -13.7747333),
    new GoogleMapsLatLng(-39.6421051, -13.7733995),
    new GoogleMapsLatLng(-39.634552, -13.7647296),
    new GoogleMapsLatLng(-39.6235657, -13.7467219),
    new GoogleMapsLatLng(-39.6105194, -13.7300469),
    new GoogleMapsLatLng(-39.6050262, -13.7193743),
    new GoogleMapsLatLng(-39.5816803, -13.6860192),
    new GoogleMapsLatLng(-39.5755005, -13.6519921),
    new GoogleMapsLatLng(-39.6338654, -13.6353104),
    new GoogleMapsLatLng(-39.6551514, -13.5966042),
    new GoogleMapsLatLng(-39.6709442, -13.5572242),
    new GoogleMapsLatLng(-39.6647644, -13.5418709),
    new GoogleMapsLatLng(-39.6805573, -13.5318574),
    new GoogleMapsLatLng(-39.6949768, -13.5171701),
    new GoogleMapsLatLng(-39.710083, -13.5191729),
    new GoogleMapsLatLng(-39.7258759, -13.504151),
    new GoogleMapsLatLng(-39.7478485, -13.5071555),
    new GoogleMapsLatLng(-39.7677612, -13.5171701),
    new GoogleMapsLatLng(-39.7911072, -13.5318574),
    new GoogleMapsLatLng(-39.8144531, -13.573244),
    new GoogleMapsLatLng(-39.861145, -13.5578917),
    new GoogleMapsLatLng(-39.8989105, -13.4811156),
    new GoogleMapsLatLng(-39.9133301, -13.4804478),
    new GoogleMapsLatLng(-39.938736, -13.4944697),
    new GoogleMapsLatLng(-39.9991608, -13.463754),
    new GoogleMapsLatLng(-40.0005341, -13.4296951),
    new GoogleMapsLatLng(-39.992981, -13.4243521),
    new GoogleMapsLatLng(-39.9916077, -13.4036468),
    new GoogleMapsLatLng(-39.9758148, -13.3795997),
    new GoogleMapsLatLng(-39.9758148, -13.3635669),
    new GoogleMapsLatLng(-39.9840546, -13.3441926),
    new GoogleMapsLatLng(-39.9799347, -13.3381796),
    new GoogleMapsLatLng(-39.9819946, -13.3241486),

  ];
  private lafaiateCoutinho = [
    new GoogleMapsLatLng(-40.2381134, -13.4690962),
    new GoogleMapsLatLng(-40.5354309, -13.7120366),
    new GoogleMapsLatLng(-40.5038452, -13.707367),
    new GoogleMapsLatLng(-40.4866791, -13.7026973),
    new GoogleMapsLatLng(-40.4818726, -13.6893549),
    new GoogleMapsLatLng(-40.1165771, -13.6740102),
    new GoogleMapsLatLng(-40.1488495, -13.6419832),
    new GoogleMapsLatLng(-40.1598358, -13.6232988),
    new GoogleMapsLatLng(-40.1680756, -13.6019434),
    new GoogleMapsLatLng(-40.1673889, -13.5812535),
    new GoogleMapsLatLng(-40.1701355, -13.5612292),
    new GoogleMapsLatLng(-40.2085876, -13.4811156),
    new GoogleMapsLatLng(-40.2236938, -13.4731027),
    new GoogleMapsLatLng(-40.2381134, -13.4690962),

  ];
  private lagedoDoTabocal = [
    new GoogleMapsLatLng(-40.2381134, -13.4690962),
    new GoogleMapsLatLng(-40.2367401, -13.4604151),
    new GoogleMapsLatLng(-40.2236938, -13.4530694),
    new GoogleMapsLatLng(-40.2099609, -13.4410486),
    new GoogleMapsLatLng(-40.2140808, -13.430363),
    new GoogleMapsLatLng(-40.2278137, -13.4216805),
    new GoogleMapsLatLng(-40.2353668, -13.4043147),
    new GoogleMapsLatLng(-40.2230072, -13.3922915),
    new GoogleMapsLatLng(-40.207901, -13.3896196),
    new GoogleMapsLatLng(-40.1564026, -13.3622308),
    new GoogleMapsLatLng(-40.153656, -13.3448607),
    new GoogleMapsLatLng(-40.1763153, -13.3335027),
    new GoogleMapsLatLng(-40.2030945, -13.3141259),
    new GoogleMapsLatLng(-40.2188873, -13.310785),
    new GoogleMapsLatLng(-40.2442932, -13.2880651),
    new GoogleMapsLatLng(-40.2614594, -13.2840555),
    new GoogleMapsLatLng(-40.271759, -13.2860603),
    new GoogleMapsLatLng(-40.2854919, -13.3201396),
    new GoogleMapsLatLng(-40.2848053, -13.340852),
    new GoogleMapsLatLng(-40.2772522, -13.3455288),
    new GoogleMapsLatLng(-40.283432, -13.3635669),
    new GoogleMapsLatLng(-40.2882385, -13.3829397),
    new GoogleMapsLatLng(-40.2978516, -13.4136657),
    new GoogleMapsLatLng(-40.3102112, -13.451066),
    new GoogleMapsLatLng(-40.3349304, -13.463754),
    new GoogleMapsLatLng(-40.3582764, -13.4604151),
    new GoogleMapsLatLng(-40.380249, -13.4590796),
    new GoogleMapsLatLng(-40.4056549, -13.472435),
    new GoogleMapsLatLng(-40.4296875, -13.4951374),
    new GoogleMapsLatLng(-40.4413605, -13.5198405),
    new GoogleMapsLatLng(-40.4605865, -13.537198),
    new GoogleMapsLatLng(-40.4640198, -13.5605617),
    new GoogleMapsLatLng(-40.4695129, -13.5832558),
    new GoogleMapsLatLng(-40.4729462, -13.6199621),
    new GoogleMapsLatLng(-40.5354309, -13.7120366),
    new GoogleMapsLatLng(-40.2381134, -13.4690962),

  ];
  private maracas = [
    new GoogleMapsLatLng(-40.4942322, -13.1911478),
    new GoogleMapsLatLng(-40.6082153, -13.19917),
    new GoogleMapsLatLng(-40.6528473, -13.2319246),
    new GoogleMapsLatLng(-40.705719, -13.2800458),
    new GoogleMapsLatLng(-40.7572174, -13.3448607),
    new GoogleMapsLatLng(-40.7407379, -13.4063185),
    new GoogleMapsLatLng(-40.7311249, -13.4497304),
    new GoogleMapsLatLng(-40.7208252, -13.4811156),
    new GoogleMapsLatLng(-40.6967926, -13.5078231),
    new GoogleMapsLatLng(-40.6878662, -13.5538866),
    new GoogleMapsLatLng(-40.7002258, -13.6146234),
    new GoogleMapsLatLng(-40.7098389, -13.6466541),
    new GoogleMapsLatLng(-40.7221985, -13.6926906),
    new GoogleMapsLatLng(-40.736618, -13.7300469),
    new GoogleMapsLatLng(-40.738678, -13.7560594),
    new GoogleMapsLatLng(-40.7318115, -13.7860703),
    new GoogleMapsLatLng(-40.7201385, -13.800074),
    new GoogleMapsLatLng(-40.7043457, -13.8087426),
    new GoogleMapsLatLng(-40.6768799, -13.8494138),
    new GoogleMapsLatLng(-40.6624603, -13.8427469),
    new GoogleMapsLatLng(-40.6494141, -13.8327461),
    new GoogleMapsLatLng(-40.6384277, -13.8400801),
    new GoogleMapsLatLng(-40.6308746, -13.8494138),
    new GoogleMapsLatLng(-40.620575, -13.8534139),
    new GoogleMapsLatLng(-40.6109619, -13.8614138),
    new GoogleMapsLatLng(-40.597229, -13.8627471),
    new GoogleMapsLatLng(-40.5800629, -13.8674136),
    new GoogleMapsLatLng(-40.5649567, -13.8674136),
    new GoogleMapsLatLng(-40.5560303, -13.8654137),
    new GoogleMapsLatLng(-40.5464172, -13.864747),
    new GoogleMapsLatLng(-40.5402374, -13.8580806),
    new GoogleMapsLatLng(-40.5251312, -13.864747),
    new GoogleMapsLatLng(-40.5251312, -13.8794127),
    new GoogleMapsLatLng(-40.512085, -13.8834122),
    new GoogleMapsLatLng(-40.510025, -13.8747464),
    new GoogleMapsLatLng(-40.5010986, -13.8734132),
    new GoogleMapsLatLng(-40.4894257, -13.8767462),
    new GoogleMapsLatLng(-40.4681396, -13.8687468),
    new GoogleMapsLatLng(-40.4523468, -13.866747),
    new GoogleMapsLatLng(-40.4502869, -13.8547472),
    new GoogleMapsLatLng(-40.5271912, -13.7887377),
    new GoogleMapsLatLng(-40.5388641, -13.733382),
    new GoogleMapsLatLng(-40.5354309, -13.7120366),
    new GoogleMapsLatLng(-40.4729462, -13.6199621),
    new GoogleMapsLatLng(-40.4695129, -13.5832558),
    new GoogleMapsLatLng(-40.4640198, -13.5605617),
    new GoogleMapsLatLng(-40.4605865, -13.537198),
    new GoogleMapsLatLng(-40.4413605, -13.5198405),
    new GoogleMapsLatLng(-40.4296875, -13.4951374),
    new GoogleMapsLatLng(-40.4056549, -13.472435),
    new GoogleMapsLatLng(-40.380249, -13.4590796),
    new GoogleMapsLatLng(-40.3349304, -13.463754),
    new GoogleMapsLatLng(-40.3102112, -13.451066),
    new GoogleMapsLatLng(-40.2772522, -13.3455288),
    new GoogleMapsLatLng(-40.2848053, -13.340852),
    new GoogleMapsLatLng(-40.4084015, -13.3047711),
    new GoogleMapsLatLng(-40.4942322, -13.1911478),

  ];
  private marcionilioSouza = [
    new GoogleMapsLatLng(-40.4942322, -13.1911478),
    new GoogleMapsLatLng(-40.382309, -13.1403345),
    new GoogleMapsLatLng(-40.3946686, -13.1356538),
    new GoogleMapsLatLng(-40.4159546, -13.0941921),
    new GoogleMapsLatLng(-40.4276276, -13.0768029),
    new GoogleMapsLatLng(-40.4550934, -13.0487101),
    new GoogleMapsLatLng(-40.4640198, -13.022621),
    new GoogleMapsLatLng(-40.4804993, -13.0045577),
    new GoogleMapsLatLng(-40.5127716, -12.9764567),
    new GoogleMapsLatLng(-40.531311, -12.9858241),
    new GoogleMapsLatLng(-40.5402374, -12.9965292),
    new GoogleMapsLatLng(-40.5594635, -13.0038887),
    new GoogleMapsLatLng(-40.5821228, -13.0038887),
    new GoogleMapsLatLng(-40.6130219, -13.012586),
    new GoogleMapsLatLng(-40.6356812, -13.012586),
    new GoogleMapsLatLng(-40.6576538, -13.012586),
    new GoogleMapsLatLng(-40.6803131, -13.0259659),
    new GoogleMapsLatLng(-40.7077789, -13.0346625),
    new GoogleMapsLatLng(-40.7318115, -13.0393451),
    new GoogleMapsLatLng(-40.7537842, -13.0393451),
    new GoogleMapsLatLng(-40.7750702, -13.0426898),
    new GoogleMapsLatLng(-40.792923, -13.0594125),
    new GoogleMapsLatLng(-40.814209, -13.0955297),
    new GoogleMapsLatLng(-40.8602142, -13.1383285),
    new GoogleMapsLatLng(-40.868454, -13.159725),
    new GoogleMapsLatLng(-40.8856201, -13.1924849),
    new GoogleMapsLatLng(-40.9144592, -13.2232351),
    new GoogleMapsLatLng(-40.9000397, -13.2432874),
    new GoogleMapsLatLng(-40.880127, -13.2680164),
    new GoogleMapsLatLng(-40.8437347, -13.2954159),
    new GoogleMapsLatLng(-40.8375549, -13.3147941),
    new GoogleMapsLatLng(-40.8231354, -13.3274894),
    new GoogleMapsLatLng(-40.7901764, -13.330162),
    new GoogleMapsLatLng(-40.7572174, -13.3448607),
    new GoogleMapsLatLng(-40.705719, -13.2800458),
    new GoogleMapsLatLng(-40.6528473, -13.2319246),
    new GoogleMapsLatLng(-40.6082153, -13.19917),
    new GoogleMapsLatLng(-40.4942322, -13.1911478),

  ];
  private jitauna = [
    new GoogleMapsLatLng(-39.9243164, -13.8174108),
    new GoogleMapsLatLng(-40.0108337, -13.9187386),
    new GoogleMapsLatLng(-39.9497223, -13.9773817),
    new GoogleMapsLatLng(-39.9167633, -14.0080301),
    new GoogleMapsLatLng(-39.8892975, -14.0166909),
    new GoogleMapsLatLng(-39.8783112, -14.0073639),
    new GoogleMapsLatLng(-39.8659515, -14.0060315),
    new GoogleMapsLatLng(-39.8439789, -14.0140261),
    new GoogleMapsLatLng(-39.8323059, -14.0193557),
    new GoogleMapsLatLng(-39.828186, -14.0306807),
    new GoogleMapsLatLng(-39.8206329, -14.0406729),
    new GoogleMapsLatLng(-39.8123932, -14.046668),
    new GoogleMapsLatLng(-39.8034668, -14.053329),
    new GoogleMapsLatLng(-39.7931671, -14.0426713),
    new GoogleMapsLatLng(-39.7924805, -14.0293484),
    new GoogleMapsLatLng(-39.7890472, -14.0140261),
    new GoogleMapsLatLng(-39.7725677, -14.0033665),
    new GoogleMapsLatLng(-39.7608948, -13.9933727),
    new GoogleMapsLatLng(-39.7574615, -13.9813796),
    new GoogleMapsLatLng(-39.9243164, -13.8174108),

  ];
  private aiquara = [
    new GoogleMapsLatLng(-39.9414825, -14.0759751),
    new GoogleMapsLatLng(-39.9634552, -14.0593238),
    new GoogleMapsLatLng(-39.9634552, -14.1618766),
    new GoogleMapsLatLng(-39.91745, -14.1838462),
    new GoogleMapsLatLng(-39.8831177, -14.1339122),
    new GoogleMapsLatLng(-39.8645782, -14.1372415),
    new GoogleMapsLatLng(-39.8419189, -14.129917),
    new GoogleMapsLatLng(-39.8274994, -14.1205947),
    new GoogleMapsLatLng(-39.8048401, -14.1019487),
    new GoogleMapsLatLng(-39.8171997, -14.0939572),
    new GoogleMapsLatLng(-39.8261261, -14.0859653),
    new GoogleMapsLatLng(-39.8233795, -14.0773072),
    new GoogleMapsLatLng(-39.8117065, -14.0793052),
    new GoogleMapsLatLng(-39.7966003, -14.072645),
    new GoogleMapsLatLng(-39.7904205, -14.060656),
    new GoogleMapsLatLng(-39.8034668, -14.053329),
    new GoogleMapsLatLng(-39.8206329, -14.0406729),
    new GoogleMapsLatLng(-39.828186, -14.0306807),
    new GoogleMapsLatLng(-39.8323059, -14.0193557),
    new GoogleMapsLatLng(-39.8474126, -14.0123611),
    new GoogleMapsLatLng(-39.8659515, -14.0060315),
    new GoogleMapsLatLng(-39.8783112, -14.0073639),
    new GoogleMapsLatLng(-39.8892975, -14.0166909),
    new GoogleMapsLatLng(-39.903717, -14.0280161),
    new GoogleMapsLatLng(-39.9188232, -14.061322),
    new GoogleMapsLatLng(-39.9414825, -14.0759751),

  ];
  private itagi = [
    new GoogleMapsLatLng(-40.1014709, -14.2577282),
    new GoogleMapsLatLng(-40.078125, -14.2643831),
    new GoogleMapsLatLng(-40.0650787, -14.2557317),
    new GoogleMapsLatLng(-40.0499725, -14.2570627),
    new GoogleMapsLatLng(-40.0348663, -14.2617212),
    new GoogleMapsLatLng(-40.0012207, -14.2637176),
    new GoogleMapsLatLng(-39.9730682, -14.2563972),
    new GoogleMapsLatLng(-39.9538422, -14.2497421),
    new GoogleMapsLatLng(-39.927063, -14.2390936),
    new GoogleMapsLatLng(-39.91745, -14.1838462),
    new GoogleMapsLatLng(-39.9634552, -14.1618766),
    new GoogleMapsLatLng(-39.9634552, -14.0593238),
    new GoogleMapsLatLng(-39.9977875, -14.0386745),
    new GoogleMapsLatLng(-40.0410461, -13.9980365),
    new GoogleMapsLatLng(-40.1007843, -14.181849),
    new GoogleMapsLatLng(-40.0939178, -14.1925003),
    new GoogleMapsLatLng(-40.0863647, -14.1964944),
    new GoogleMapsLatLng(-40.0849915, -14.2164638),
    new GoogleMapsLatLng(-40.0904846, -14.2291101),
    new GoogleMapsLatLng(-40.0987244, -14.2437524),
    new GoogleMapsLatLng(-40.1014709, -14.2577282),
  ];
  private itagiba = [
    new GoogleMapsLatLng(-40.0067139, -14.2623867),
    new GoogleMapsLatLng(-40.0074005, -14.2876735),
    new GoogleMapsLatLng(-39.9572754, -14.3608563),
    new GoogleMapsLatLng(-39.9414825, -14.3608563),
    new GoogleMapsLatLng(-39.9201965, -14.3615215),
    new GoogleMapsLatLng(-39.8920441, -14.3714991),
    new GoogleMapsLatLng(-39.8618317, -14.3681733),
    new GoogleMapsLatLng(-39.8323059, -14.3768203),
    new GoogleMapsLatLng(-39.8034668, -14.3675081),
    new GoogleMapsLatLng(-39.7554016, -14.3768203),
    new GoogleMapsLatLng(-39.7052765, -14.3628519),
    new GoogleMapsLatLng(-39.6640778, -14.1811833),
    new GoogleMapsLatLng(-39.6826172, -14.177189),
    new GoogleMapsLatLng(-39.6949768, -14.1698658),
    new GoogleMapsLatLng(-39.6970367, -14.1585477),
    new GoogleMapsLatLng(-39.7059631, -14.1505581),
    new GoogleMapsLatLng(-39.719696, -14.147229),
    new GoogleMapsLatLng(-39.733429, -14.1432341),
    new GoogleMapsLatLng(-39.7464752, -14.1365757),
    new GoogleMapsLatLng(-39.7615814, -14.1305829),
    new GoogleMapsLatLng(-39.773941, -14.1165992),
    new GoogleMapsLatLng(-39.7794342, -14.1052785),
    new GoogleMapsLatLng(-39.8048401, -14.1019487),
    new GoogleMapsLatLng(-39.8171997, -14.10994),
    new GoogleMapsLatLng(-39.8274994, -14.1205947),
    new GoogleMapsLatLng(-39.8419189, -14.129917),
    new GoogleMapsLatLng(-39.8645782, -14.1372415),
    new GoogleMapsLatLng(-39.8831177, -14.1339122),
    new GoogleMapsLatLng(-39.91745, -14.1838462),
    new GoogleMapsLatLng(-39.927063, -14.2390936),
    new GoogleMapsLatLng(-39.9538422, -14.2497421),
    new GoogleMapsLatLng(-39.9730682, -14.2563972),
    new GoogleMapsLatLng(-40.0012207, -14.2637176),
    new GoogleMapsLatLng(-40.0067139, -14.2623867),

  ];
  private darioMeira = [
    new GoogleMapsLatLng(-39.8419189, -14.4519688),
    new GoogleMapsLatLng(-39.8323059, -14.3768203),
    new GoogleMapsLatLng(-39.8618317, -14.3681733),
    new GoogleMapsLatLng(-39.8920441, -14.3714991),
    new GoogleMapsLatLng(-39.9201965, -14.3615215),
    new GoogleMapsLatLng(-39.9572754, -14.3608563),
    new GoogleMapsLatLng(-40.0074005, -14.2876735),
    new GoogleMapsLatLng(-40.0067139, -14.2623867),
    new GoogleMapsLatLng(-40.02388, -14.2617212),
    new GoogleMapsLatLng(-40.0348663, -14.2617212),
    new GoogleMapsLatLng(-40.0499725, -14.2570627),
    new GoogleMapsLatLng(-40.0650787, -14.2557317),
    new GoogleMapsLatLng(-40.078125, -14.2643831),
    new GoogleMapsLatLng(-40.033493, -14.4433247),
    new GoogleMapsLatLng(-40.0437927, -14.4419948),
    new GoogleMapsLatLng(-40.0492859, -14.4552933),
    new GoogleMapsLatLng(-40.0540924, -14.4732451),
    new GoogleMapsLatLng(-40.0966644, -14.5330739),
    new GoogleMapsLatLng(-40.0410461, -14.5344033),
    new GoogleMapsLatLng(-40.0149536, -14.5310799),
    new GoogleMapsLatLng(-40.0128937, -14.5124681),
    new GoogleMapsLatLng(-39.9950409, -14.515127),
    new GoogleMapsLatLng(-39.9737549, -14.4898659),
    new GoogleMapsLatLng(-39.9559021, -14.4925251),
    new GoogleMapsLatLng(-39.9298096, -14.4552933),
    new GoogleMapsLatLng(-39.9208832, -14.43867),
    new GoogleMapsLatLng(-39.905777, -14.438005),
    new GoogleMapsLatLng(-39.8934174, -14.4426597),
    new GoogleMapsLatLng(-39.8769379, -14.4479792),
    new GoogleMapsLatLng(-39.8618317, -14.4539635),
    new GoogleMapsLatLng(-39.8419189, -14.4519688),

  ];
  private manoelVitorino = [
    new GoogleMapsLatLng(-40.3905487, -14.0599899),
    new GoogleMapsLatLng(-40.5141449, -13.9274027),
    new GoogleMapsLatLng(-40.5182648, -13.9180721),
    new GoogleMapsLatLng(-40.5052185, -13.9054085),
    new GoogleMapsLatLng(-40.5052185, -13.8980766),
    new GoogleMapsLatLng(-40.5127716, -13.8967435),
    new GoogleMapsLatLng(-40.5278778, -13.8967435),
    new GoogleMapsLatLng(-40.5395508, -13.9040754),
    new GoogleMapsLatLng(-40.5457306, -13.8934108),
    new GoogleMapsLatLng(-40.5388641, -13.8840788),
    new GoogleMapsLatLng(-40.5374908, -13.8727466),
    new GoogleMapsLatLng(-40.5519104, -13.8800792),
    new GoogleMapsLatLng(-40.56633, -13.8807458),
    new GoogleMapsLatLng(-40.5793762, -13.8774129),
    new GoogleMapsLatLng(-40.5917358, -13.8727466),
    new GoogleMapsLatLng(-40.6047821, -13.8707467),
    new GoogleMapsLatLng(-40.6095886, -13.8794127),
    new GoogleMapsLatLng(-40.6192017, -13.8660803),
    new GoogleMapsLatLng(-40.6192017, -13.8580806),
    new GoogleMapsLatLng(-40.6322479, -13.8540806),
    new GoogleMapsLatLng(-40.6487274, -13.8380799),
    new GoogleMapsLatLng(-40.6720734, -13.8520806),
    new GoogleMapsLatLng(-40.684433, -13.8540806),
    new GoogleMapsLatLng(-40.6919861, -13.8454137),
    new GoogleMapsLatLng(-40.7029724, -13.8394134),
    new GoogleMapsLatLng(-40.7139587, -13.8454137),
    new GoogleMapsLatLng(-40.7242584, -13.8440803),
    new GoogleMapsLatLng(-40.7283783, -13.8327461),
    new GoogleMapsLatLng(-40.7407379, -13.8407468),
    new GoogleMapsLatLng(-40.7757568, -13.8380799),
    new GoogleMapsLatLng(-40.7936096, -13.8380799),
    new GoogleMapsLatLng(-40.8128357, -13.8414135),
    new GoogleMapsLatLng(-40.8286285, -13.8454137),
    new GoogleMapsLatLng(-40.8506012, -13.8534139),
    new GoogleMapsLatLng(-40.8650208, -13.8520806),
    new GoogleMapsLatLng(-40.8746338, -13.8487471),
    new GoogleMapsLatLng(-40.8842468, -13.8520806),
    new GoogleMapsLatLng(-40.8842468, -13.8654137),
    new GoogleMapsLatLng(-40.8904266, -13.875413),
    new GoogleMapsLatLng(-40.901413, -13.8887448),
    new GoogleMapsLatLng(-40.9172058, -13.8954104),
    new GoogleMapsLatLng(-40.9302521, -13.896077),
    new GoogleMapsLatLng(-40.9261322, -13.9054085),
    new GoogleMapsLatLng(-40.9151459, -13.9020759),
    new GoogleMapsLatLng(-40.9096527, -13.9094076),
    new GoogleMapsLatLng(-40.9151459, -13.9180721),
    new GoogleMapsLatLng(-40.9261322, -13.922071),
    new GoogleMapsLatLng(-40.9357452, -13.9160726),
    new GoogleMapsLatLng(-40.9453583, -13.9100741),
    new GoogleMapsLatLng(-40.9515381, -13.9174056),
    new GoogleMapsLatLng(-40.9584045, -13.9260698),
    new GoogleMapsLatLng(-40.9638977, -13.9413979),
    new GoogleMapsLatLng(-40.9735107, -13.94473),
    new GoogleMapsLatLng(-40.9741974, -13.956725),
    new GoogleMapsLatLng(-40.976944, -13.9667204),
    new GoogleMapsLatLng(-40.9776306, -13.980047),
    new GoogleMapsLatLng(-40.2401733, -14.3116269),
    new GoogleMapsLatLng(-40.1886749, -14.2264478),
    new GoogleMapsLatLng(-40.1694489, -14.1612108),
    new GoogleMapsLatLng(-40.1797485, -14.1239241),
    new GoogleMapsLatLng(-40.2264404, -14.1219265),
    new GoogleMapsLatLng(-40.2044678, -14.0586577),
    new GoogleMapsLatLng(-40.2030945, -14.0386745),
    new GoogleMapsLatLng(-40.2257538, -14.032013),
    new GoogleMapsLatLng(-40.2497864, -14.0373422),
    new GoogleMapsLatLng(-40.3054047, -14.0100288),
    new GoogleMapsLatLng(-40.316391, -14.0073639),
    new GoogleMapsLatLng(-40.3225708, -14.0153585),
    new GoogleMapsLatLng(-40.3397369, -14.0220205),
    new GoogleMapsLatLng(-40.34935, -14.0326792),
    new GoogleMapsLatLng(-40.3610229, -14.0513307),
    new GoogleMapsLatLng(-40.3905487, -14.0599899),
  ];
  private boaNova = [
    new GoogleMapsLatLng(-40.4832458, -14.3695036),
    new GoogleMapsLatLng(-40.4008484, -14.41074),
    new GoogleMapsLatLng(-40.2992249, -14.4532986),
    new GoogleMapsLatLng(-40.177002, -14.5184506),
    new GoogleMapsLatLng(-40.0966644, -14.5330739),
    new GoogleMapsLatLng(-40.0540924, -14.4732451),
    new GoogleMapsLatLng(-40.0492859, -14.4552933),
    new GoogleMapsLatLng(-40.0437927, -14.4419948),
    new GoogleMapsLatLng(-40.033493, -14.4433247),
    new GoogleMapsLatLng(-40.078125, -14.2643831),
    new GoogleMapsLatLng(-40.1014709, -14.2577282),
    new GoogleMapsLatLng(-40.1186371, -14.2311069),
    new GoogleMapsLatLng(-40.1282501, -14.2410902),
    new GoogleMapsLatLng(-40.1584625, -14.2544007),
    new GoogleMapsLatLng(-40.1886749, -14.2264478),
    new GoogleMapsLatLng(-40.2401733, -14.3116269),
    new GoogleMapsLatLng(-40.4283142, -14.2264478),
    new GoogleMapsLatLng(-40.4832458, -14.3695036),

  ];
  private mirante = [
    new GoogleMapsLatLng(-40.9776306, -13.980047),
    new GoogleMapsLatLng(-40.9899902, -14.0000353),
    new GoogleMapsLatLng(-40.9947968, -14.0066977),
    new GoogleMapsLatLng(-40.9783173, -14.0146923),
    new GoogleMapsLatLng(-40.9721375, -14.0286822),
    new GoogleMapsLatLng(-40.9810638, -14.0366761),
    new GoogleMapsLatLng(-40.9913635, -14.0426713),
    new GoogleMapsLatLng(-41.009903, -14.0546612),
    new GoogleMapsLatLng(-40.9954834, -14.0599899),
    new GoogleMapsLatLng(-40.9968567, -14.0706468),
    new GoogleMapsLatLng(-41.0147095, -14.0746431),
    new GoogleMapsLatLng(-41.007843, -14.0879633),
    new GoogleMapsLatLng(-41.0181427, -14.1006168),
    new GoogleMapsLatLng(-41.0298157, -14.1039466),
    new GoogleMapsLatLng(-41.0490417, -14.1066104),
    new GoogleMapsLatLng(-41.0641479, -14.1112719),
    new GoogleMapsLatLng(-41.0847473, -14.1252559),
    new GoogleMapsLatLng(-41.1005402, -14.1312488),
    new GoogleMapsLatLng(-41.1170197, -14.1285853),
    new GoogleMapsLatLng(-41.1328125, -14.1458974),
    new GoogleMapsLatLng(-41.1403656, -14.1525555),
    new GoogleMapsLatLng(-41.1431122, -14.1612108),
    new GoogleMapsLatLng(-41.1286926, -14.1692),
    new GoogleMapsLatLng(-41.1115265, -14.174526),
    new GoogleMapsLatLng(-41.0916138, -14.1738603),
    new GoogleMapsLatLng(-41.0785675, -14.1898375),
    new GoogleMapsLatLng(-41.0668945, -14.2091419),
    new GoogleMapsLatLng(-41.052475, -14.2304413),
    new GoogleMapsLatLng(-41.0277557, -14.2424213),
    new GoogleMapsLatLng(-41.0153961, -14.2677104),
    new GoogleMapsLatLng(-40.99617, -14.2843465),
    new GoogleMapsLatLng(-40.9790039, -14.2890043),
    new GoogleMapsLatLng(-40.9364319, -14.3102962),
    new GoogleMapsLatLng(-40.9123993, -14.3242679),
    new GoogleMapsLatLng(-40.8753204, -14.3342472),
    new GoogleMapsLatLng(-40.8300018, -14.344226),
    new GoogleMapsLatLng(-40.7949829, -14.3482174),
    new GoogleMapsLatLng(-40.759964, -14.3462217),
    new GoogleMapsLatLng(-40.7290649, -14.3269291),
    new GoogleMapsLatLng(-40.6885529, -14.3335819),
    new GoogleMapsLatLng(-40.6755066, -14.3542044),
    new GoogleMapsLatLng(-40.6487274, -14.3548696),
    new GoogleMapsLatLng(-40.6281281, -14.3448912),
    new GoogleMapsLatLng(-40.6116486, -14.3369082),
    new GoogleMapsLatLng(-40.5731964, -14.3548696),
    new GoogleMapsLatLng(-40.5615234, -14.366843),
    new GoogleMapsLatLng(-40.5319977, -14.3821414),
    new GoogleMapsLatLng(-40.4832458, -14.3695036),
    new GoogleMapsLatLng(-40.4283142, -14.2264478),
    new GoogleMapsLatLng(-40.9776306, -13.980047),

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let map = new GoogleMap(document.getElementById('map'));

    // when the map is ready
    map.one(GoogleMapsEvent.MAP_READY).then(() => {

      // Codigo para retornar a posição atual do celular
      //Geolocation.getCurrentPosition().then(pos => {
      //this._latitude = pos.coords.latitude;
      //this._longitude = pos.coords.longitude;

      // move the camera
      map.moveCamera({
        target: new GoogleMapsLatLng(-13.862530, -40.082864),
        zoom: 10,
        tilt: 30
      }).then(() => {

        //add a marker
        map.addMarker({
          position: new GoogleMapsLatLng(-13.862530, -40.082864),
          title: 'You are here!'
        }).then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });


        //Add Polygons (Regiões)
        map.addPolygon({
          points: this.mirante,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Mirante');
            });
        });
        map.addPolygon({
          points: this.boaNova,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Boa Nova');
            });
        });
        map.addPolygon({
          points: this.manoelVitorino,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Manoel Vitorino');
            });
        });
        map.addPolygon({
          points: this.darioMeira,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
            this.selecionar('Dário Meira');
            });
        });
        map.addPolygon({
          points: this.itagiba,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itagiba');
            });
        });
        map.addPolygon({
          points: this.itagi,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itagi');
            });
        });
        map.addPolygon({
          points: this.aiquara,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Aiquara');
            });
        });
        map.addPolygon({
          points: this.jitauna,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Jitauna');
            });
        });
        map.addPolygon({
          points: this.marcionilioSouza,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Marcionilio Souza');
            });
        });
        map.addPolygon({
          points: this.maracas,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Maracas');
            });
        });
        map.addPolygon({
          points: this.lagedoDoTabocal,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Lagedo do Tabocal');
            });
        });
        map.addPolygon({
          points: this.lafaiateCoutinho,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Lafaiate Coutinho');
            });
        });
        map.addPolygon({
          points: this.jaguacara,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Jaguacara');
            });
        });
        map.addPolygon({
          points: this.apuarema,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Apuarema');
            });
        });
        map.addPolygon({
          points: this.jequie,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Jequié');
            });
        });
        map.addPolygon({
          points: this.itirucu,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itiruçu');
            });
        });
        map.addPolygon({
          points: this.planaltino,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Planatilno');
            });
        });
        map.addPolygon({
          points: this.itaquara,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itaquara');
            });
        });
        map.addPolygon({
          points: this.novaItarana,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Nova Itarana');
            });
        });
        map.addPolygon({
          points: this.irajuba,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Irajuba');
            });
        });
        map.addPolygon({
          points: this.cravolandia,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Cravolândia');
            });
        });
        map.addPolygon({
          points: this.santaInes,
          strokeColor: '#AA00FF',
          strokeWidth: 5,
          fillColor: '#AA00FF'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Santa Inês');
            });
        });
        map.addPolygon({
          points: this.brejoes,
          strokeColor: '#66cdaa',
          strokeWidth: 5,
          fillColor: '#66cdaa'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Brejões');
            });
        });
      });
    });

  }


  selecionar(cidade: string){
    //funcão ao selecionar a cidade
    alert(cidade);

  }

}
