import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuscaPage } from '../busca/busca';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsPolygon } from 'ionic-native';
import { EditarForaniaPage } from '../editar-forania/editar-forania';
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
    new GoogleMapsLatLng(-12.9336307, -39.9023438), new GoogleMapsLatLng(-12.9168988, -39.8989105), new GoogleMapsLatLng(-12.8807556, -39.8995972),
    new GoogleMapsLatLng(-12.9737802, -40.0163269), new GoogleMapsLatLng(-12.9891695, -40.0623322), new GoogleMapsLatLng(-12.9938530, -40.1303101),
    new GoogleMapsLatLng(-12.9831477, -40.1447296), new GoogleMapsLatLng(-13.0232900, -40.1715088), new GoogleMapsLatLng(-13.1129176, -40.1584625),
    new GoogleMapsLatLng(-13.1216111, -40.0849915), new GoogleMapsLatLng(-13.1129176, -40.0588989), new GoogleMapsLatLng(-13.1256234, -40.0465393),
    new GoogleMapsLatLng(-13.1356538, -40.0334930), new GoogleMapsLatLng(-13.1436778, -40.0183868), new GoogleMapsLatLng(-13.1510329, -40.0012207),
    new GoogleMapsLatLng(-13.1603936, -39.9998474), new GoogleMapsLatLng(-13.1690854, -39.9847412), new GoogleMapsLatLng(-13.1898108, -39.969635),
    new GoogleMapsLatLng(-13.1898115, -39.8934174), new GoogleMapsLatLng(-13.1664118, -39.9250031), new GoogleMapsLatLng(-13.1169307, -39.9353028),
    new GoogleMapsLatLng(-13.0941928, -39.9613954), new GoogleMapsLatLng(-13.0754660, -39.9593354), new GoogleMapsLatLng(-13.0413526, -39.9662019),
    new GoogleMapsLatLng(-12.9938537, -39.9510957), new GoogleMapsLatLng(-12.9336307, -39.9023438)

  ];
  private irajuba = [
    new GoogleMapsLatLng(-13.1129176, -40.1584625),
    new GoogleMapsLatLng(-13.2760361, -40.120697),
    new GoogleMapsLatLng(-13.3241486, -39.9819946),
    new GoogleMapsLatLng(-13.2620015, -39.9140167),
    new GoogleMapsLatLng(-13.2519763, -39.9126434),
    new GoogleMapsLatLng(-13.2359351, -39.9147034),
    new GoogleMapsLatLng(-13.2252404, -39.9311829),
    new GoogleMapsLatLng(-13.1898108, -39.969635),
    new GoogleMapsLatLng(-13.1690854, -39.9847412),
    new GoogleMapsLatLng(-13.1603936, -39.9998474),
    new GoogleMapsLatLng(-13.1510329, -40.0012207),
    new GoogleMapsLatLng(-13.1436778, -40.0183868),
    new GoogleMapsLatLng(-13.1356538, -40.033493),
    new GoogleMapsLatLng(-13.1256234, -40.0465393),
    new GoogleMapsLatLng(-13.1129176, -40.0588989),
    new GoogleMapsLatLng(-13.1216111, -40.0849915),
    new GoogleMapsLatLng(-13.1129176, -40.1584625),

  ];
  private cravolandia = [
    new GoogleMapsLatLng(-13.3902876, -39.8982239),
    new GoogleMapsLatLng(-13.4370416, -39.8529053),
    new GoogleMapsLatLng(-13.4450556, -39.8412323),
    new GoogleMapsLatLng(-13.4443878, -39.8316193),
    new GoogleMapsLatLng(-13.4517338, -39.8075867),
    new GoogleMapsLatLng(-13.4624185, -39.7911072),
    new GoogleMapsLatLng(-13.5318574, -39.7911072),
    new GoogleMapsLatLng(-13.5171701, -39.7677612),
    new GoogleMapsLatLng(-13.5071555, -39.7478485),
    new GoogleMapsLatLng(-13.5038172, -39.7279358),
    new GoogleMapsLatLng(-13.5191729, -39.710083),
    new GoogleMapsLatLng(-13.5171701, -39.6949768),
    new GoogleMapsLatLng(-13.5078231, -39.7032166),
    new GoogleMapsLatLng(-13.4984758, -39.710083),
    new GoogleMapsLatLng(-13.4917989, -39.7251892),
    new GoogleMapsLatLng(-13.4844542, -39.7396088),
    new GoogleMapsLatLng(-13.4751059, -39.7485352),
    new GoogleMapsLatLng(-13.4584118, -39.7505951),
    new GoogleMapsLatLng(-13.4477269, -39.7389221),
    new GoogleMapsLatLng(-13.4357059, -39.7540283),
    new GoogleMapsLatLng(-13.4243521, -39.7423553),
    new GoogleMapsLatLng(-13.4043147, -39.7499084),
    new GoogleMapsLatLng(-13.3969673, -39.7602081),
    new GoogleMapsLatLng(-13.3856117, -39.7657013),
    new GoogleMapsLatLng(-13.3562182, -39.7911072),
    new GoogleMapsLatLng(-13.3375114, -39.8261261),
    new GoogleMapsLatLng(-13.3902876, -39.8982239),

  ]
  private itaquara = [
    new GoogleMapsLatLng(-13.5318574, -39.7911072),
    new GoogleMapsLatLng(-13.4624185, -39.7911072),
    new GoogleMapsLatLng(-13.4517338, -39.8075867),
    new GoogleMapsLatLng(-13.4443878, -39.8316193),
    new GoogleMapsLatLng(-13.4450556, -39.8412323),
    new GoogleMapsLatLng(-13.4370416, -39.8529053),
    new GoogleMapsLatLng(-13.3902876, -39.8982239),
    new GoogleMapsLatLng(-13.3294938, -39.9517822),
    new GoogleMapsLatLng(-13.3241486, -39.9819946),
    new GoogleMapsLatLng(-13.3381796, -39.9799347),
    new GoogleMapsLatLng(-13.3441926, -39.9840546),
    new GoogleMapsLatLng(-13.3635669, -39.9758148),
    new GoogleMapsLatLng(-13.3795997, -39.9758148),
    new GoogleMapsLatLng(-13.4036468, -39.9916077),
    new GoogleMapsLatLng(-13.4243521, -39.992981),
    new GoogleMapsLatLng(-13.4296951, -40.0005341),
    new GoogleMapsLatLng(-13.463754, -39.9991608),
    new GoogleMapsLatLng(-13.4944697, -39.938736),
    new GoogleMapsLatLng(-13.4804478, -39.9133301),
    new GoogleMapsLatLng(-13.4811156, -39.8989105),
    new GoogleMapsLatLng(-13.5578917, -39.861145),
    new GoogleMapsLatLng(-13.573244, -39.8144531),
    new GoogleMapsLatLng(-13.5318574, -39.7911072),

  ];
  private planaltino = [
    new GoogleMapsLatLng(-13.02329, -40.1715088),
    new GoogleMapsLatLng(-13.0941921, -40.4159546),
    new GoogleMapsLatLng(-13.1356538, -40.3946686),
    new GoogleMapsLatLng(-13.1403345, -40.382309),
    new GoogleMapsLatLng(-13.1911478, -40.4942322),
    new GoogleMapsLatLng(-13.3047711, -40.4084015),
    new GoogleMapsLatLng(-13.3455288, -40.2772522),
    new GoogleMapsLatLng(-13.340852, -40.2848053),
    new GoogleMapsLatLng(-13.3201396, -40.2854919),
    new GoogleMapsLatLng(-13.2860603, -40.271759),
    new GoogleMapsLatLng(-13.2840555, -40.2614594),
    new GoogleMapsLatLng(-13.2880651, -40.2442932),
    new GoogleMapsLatLng(-13.310785, -40.2188873),
    new GoogleMapsLatLng(-13.3141259, -40.2030945),
    new GoogleMapsLatLng(-13.3335027, -40.1763153),
    new GoogleMapsLatLng(-13.3448607, -40.153656),
    new GoogleMapsLatLng(-13.3355071, -40.1049042),
    new GoogleMapsLatLng(-13.318135, -40.1131439),
    new GoogleMapsLatLng(-13.2760361, -40.120697),
    new GoogleMapsLatLng(-13.1129176, -40.1584625),
    new GoogleMapsLatLng(-13.02329, -40.1715088),

  ];
  private itirucu = [
    new GoogleMapsLatLng(-13.3355071, -40.1049042),
    new GoogleMapsLatLng(-13.3448607, -40.153656),
    new GoogleMapsLatLng(-13.3622308, -40.1564026),
    new GoogleMapsLatLng(-13.3896196, -40.207901),
    new GoogleMapsLatLng(-13.3922915, -40.2230072),
    new GoogleMapsLatLng(-13.4043147, -40.2353668),
    new GoogleMapsLatLng(-13.4216805, -40.2278137),
    new GoogleMapsLatLng(-13.430363, -40.2140808),
    new GoogleMapsLatLng(-13.4410486, -40.2099609),
    new GoogleMapsLatLng(-13.4530694, -40.2236938),
    new GoogleMapsLatLng(-13.4604151, -40.2367401),
    new GoogleMapsLatLng(-13.4690962, -40.2381134),
    new GoogleMapsLatLng(-13.4731027, -40.2236938),
    new GoogleMapsLatLng(-13.4811156, -40.2085876),
    new GoogleMapsLatLng(-13.5612292, -40.1701355),
    new GoogleMapsLatLng(-13.5812535, -40.1673889),
    new GoogleMapsLatLng(-13.6019434, -40.1680756),
    new GoogleMapsLatLng(-13.6232988, -40.1598358),
    new GoogleMapsLatLng(-13.6419832, -40.1488495),
    new GoogleMapsLatLng(-13.6499904, -40.1406097),
    new GoogleMapsLatLng(-13.6740102, -40.1165771),
    new GoogleMapsLatLng(-13.6680055, -40.0980377),
    new GoogleMapsLatLng(-13.6586645, -40.1042175),
    new GoogleMapsLatLng(-13.6466541, -40.109024),
    new GoogleMapsLatLng(-13.6306393, -40.1138306),
    new GoogleMapsLatLng(-13.6166254, -40.1165771),
    new GoogleMapsLatLng(-13.6019434, -40.1124573),
    new GoogleMapsLatLng(-13.5852581, -40.111084),
    new GoogleMapsLatLng(-13.5659017, -40.1193237),
    new GoogleMapsLatLng(-13.5278518, -40.1158905),
    new GoogleMapsLatLng(-13.5218434, -40.1076508),
    new GoogleMapsLatLng(-13.4831187, -40.0733185),
    new GoogleMapsLatLng(-13.4363737, -40.1097107),
    new GoogleMapsLatLng(-13.3355071, -40.1049042),

  ];
  private jequie = [
    new GoogleMapsLatLng(-13.6680055, -40.0980377),
    new GoogleMapsLatLng(-13.6740102, -40.1165771),
    new GoogleMapsLatLng(-13.6893549, -40.4818726),
    new GoogleMapsLatLng(-13.7026973, -40.4866791),
    new GoogleMapsLatLng(-13.707367, -40.5038452),
    new GoogleMapsLatLng(-13.7120366, -40.5354309),
    new GoogleMapsLatLng(-13.733382, -40.5388641),
    new GoogleMapsLatLng(-13.7887377, -40.5271912),
    new GoogleMapsLatLng(-13.8134101, -40.4969788),
    new GoogleMapsLatLng(-13.8547472, -40.4502869),
    new GoogleMapsLatLng(-13.8614138, -40.4372406),
    new GoogleMapsLatLng(-13.8507472, -40.4303741),
    new GoogleMapsLatLng(-13.8534139, -40.4173279),
    new GoogleMapsLatLng(-13.8480805, -40.4097748),
    new GoogleMapsLatLng(-13.8534139, -40.403595),
    new GoogleMapsLatLng(-13.8454137, -40.3788757),
    new GoogleMapsLatLng(-13.8427469, -40.3569031),
    new GoogleMapsLatLng(-13.8400801, -40.3232574),
    new GoogleMapsLatLng(-13.8474138, -40.3060913),
    new GoogleMapsLatLng(-13.8507472, -40.2882385),
    new GoogleMapsLatLng(-13.8527472, -40.2710724),
    new GoogleMapsLatLng(-13.8600805, -40.252533),
    new GoogleMapsLatLng(-13.8540806, -40.2456665),
    new GoogleMapsLatLng(-13.8454137, -40.2456665),
    new GoogleMapsLatLng(-13.8487471, -40.2360535),
    new GoogleMapsLatLng(-13.8627471, -40.2367401),
    new GoogleMapsLatLng(-13.8700801, -40.2319336),
    new GoogleMapsLatLng(-13.87208, -40.2436066),
    new GoogleMapsLatLng(-13.8794127, -40.2456665),
    new GoogleMapsLatLng(-13.906075, -40.2559662),
    new GoogleMapsLatLng(-13.875413, -40.2600861),
    new GoogleMapsLatLng(-13.8734132, -40.2703857),
    new GoogleMapsLatLng(-13.8627471, -40.2799988),
    new GoogleMapsLatLng(-13.8594139, -40.2916718),
    new GoogleMapsLatLng(-13.8554139, -40.304718),
    new GoogleMapsLatLng(-13.8527472, -40.3177643),
    new GoogleMapsLatLng(-13.8500805, -40.3369904),
    new GoogleMapsLatLng(-13.8534139, -40.34729),
    new GoogleMapsLatLng(-13.8567472, -40.3603363),
    new GoogleMapsLatLng(-13.8560806, -40.3699493),
    new GoogleMapsLatLng(-13.8594139, -40.3864288),
    new GoogleMapsLatLng(-13.8614138, -40.3981018),
    new GoogleMapsLatLng(-13.8674136, -40.4276276),
    new GoogleMapsLatLng(-13.8794127, -40.434494),
    new GoogleMapsLatLng(-13.87208, -40.4482269),
    new GoogleMapsLatLng(-13.8834122, -40.4949188),
    new GoogleMapsLatLng(-13.8920777, -40.5024719),
    new GoogleMapsLatLng(-13.8980766, -40.4956055),
    new GoogleMapsLatLng(-13.8980766, -40.5052185),
    new GoogleMapsLatLng(-13.9054085, -40.5052185),
    new GoogleMapsLatLng(-13.9180721, -40.5182648),
    new GoogleMapsLatLng(-13.9274027, -40.5141449),
    new GoogleMapsLatLng(-14.0599899, -40.3905487),
    new GoogleMapsLatLng(-14.0513307, -40.3610229),
    new GoogleMapsLatLng(-14.0326792, -40.34935),
    new GoogleMapsLatLng(-14.0220205, -40.3397369),
    new GoogleMapsLatLng(-14.0153585, -40.3225708),
    new GoogleMapsLatLng(-14.0073639, -40.316391),
    new GoogleMapsLatLng(-14.0100288, -40.3054047),
    new GoogleMapsLatLng(-14.0373422, -40.2497864),
    new GoogleMapsLatLng(-14.032013, -40.2257538),
    new GoogleMapsLatLng(-14.0386745, -40.2030945),
    new GoogleMapsLatLng(-14.0586577, -40.2044678),
    new GoogleMapsLatLng(-14.0813033, -40.2120209),
    new GoogleMapsLatLng(-14.1219265, -40.2264404),
    new GoogleMapsLatLng(-14.1239241, -40.1797485),
    new GoogleMapsLatLng(-14.1612108, -40.1694489),
    new GoogleMapsLatLng(-14.2264478, -40.1886749),
    new GoogleMapsLatLng(-14.2544007, -40.1584625),
    new GoogleMapsLatLng(-14.2410902, -40.1282501),
    new GoogleMapsLatLng(-14.2311069, -40.1186371),
    new GoogleMapsLatLng(-14.2577282, -40.1014709),
    new GoogleMapsLatLng(-14.2437524, -40.0987244),
    new GoogleMapsLatLng(-14.2337691, -40.0946045),
    new GoogleMapsLatLng(-14.2231198, -40.087738),
    new GoogleMapsLatLng(-14.2104731, -40.0849915),
    new GoogleMapsLatLng(-14.1964944, -40.0863647),
    new GoogleMapsLatLng(-14.1925003, -40.0939178),
    new GoogleMapsLatLng(-14.181849, -40.1007843),
    new GoogleMapsLatLng(-13.9980365, -40.0410461),
    new GoogleMapsLatLng(-14.0386745, -39.9977875),
    new GoogleMapsLatLng(-14.0759751, -39.9414825),
    new GoogleMapsLatLng(-14.061322, -39.9188232),
    new GoogleMapsLatLng(-14.0280161, -39.903717),
    new GoogleMapsLatLng(-14.0166909, -39.8892975),
    new GoogleMapsLatLng(-14.0080301, -39.9167633),
    new GoogleMapsLatLng(-13.9773817, -39.9497223),
    new GoogleMapsLatLng(-13.9187386, -40.0108337),
    new GoogleMapsLatLng(-13.8174108, -39.9243164),
    new GoogleMapsLatLng(-13.9813796, -39.7574615),
    new GoogleMapsLatLng(-13.9420643, -39.743042),
    new GoogleMapsLatLng(-13.9294021, -39.733429),
    new GoogleMapsLatLng(-13.919405, -39.7093964),
    new GoogleMapsLatLng(-13.9080746, -39.7265625),
    new GoogleMapsLatLng(-13.8660803, -39.752655),
    new GoogleMapsLatLng(-13.8674136, -39.7691345),
    new GoogleMapsLatLng(-13.8574139, -39.7842407),
    new GoogleMapsLatLng(-13.8347463, -39.7725677),
    new GoogleMapsLatLng(-13.8194111, -39.773941),
    new GoogleMapsLatLng(-13.7847365, -39.8123932),
    new GoogleMapsLatLng(-13.732715, -39.8412323),
    new GoogleMapsLatLng(-13.643985, -39.8535919),
    new GoogleMapsLatLng(-13.643985, -39.8680115),
    new GoogleMapsLatLng(-13.6766789, -39.9105835),
    new GoogleMapsLatLng(-13.6766789, -39.9421692),
    new GoogleMapsLatLng(-13.6646694, -39.9785614),
    new GoogleMapsLatLng(-13.6446523, -39.9936676),
    new GoogleMapsLatLng(-13.6419832, -40.012207),
    new GoogleMapsLatLng(-13.6453196, -40.0637054),
    new GoogleMapsLatLng(-13.6680055, -40.0980377),

  ];
  private apuarema = [
    new GoogleMapsLatLng(-13.800074, -39.7948837),
    new GoogleMapsLatLng(-13.8194111, -39.773941),
    new GoogleMapsLatLng(-13.8347463, -39.7725677),
    new GoogleMapsLatLng(-13.8574139, -39.7842407),
    new GoogleMapsLatLng(-13.8674136, -39.7691345),
    new GoogleMapsLatLng(-13.8660803, -39.752655),
    new GoogleMapsLatLng(-13.9080746, -39.7265625),
    new GoogleMapsLatLng(-13.9004095, -39.7176361),
    new GoogleMapsLatLng(-13.9147396, -39.7135162),
    new GoogleMapsLatLng(-13.8904112, -39.688797),
    new GoogleMapsLatLng(-13.8787461, -39.6805573),
    new GoogleMapsLatLng(-13.8704134, -39.6757507),
    new GoogleMapsLatLng(-13.8617471, -39.6702576),
    new GoogleMapsLatLng(-13.8574139, -39.6754074),
    new GoogleMapsLatLng(-13.8470804, -39.6990967),
    new GoogleMapsLatLng(-13.8374132, -39.6987534),
    new GoogleMapsLatLng(-13.825412, -39.6946335),
    new GoogleMapsLatLng(-13.8134101, -39.6884537),
    new GoogleMapsLatLng(-13.8020745, -39.6970367),
    new GoogleMapsLatLng(-13.7914051, -39.6973801),
    new GoogleMapsLatLng(-13.78507, -39.6918869),
    new GoogleMapsLatLng(-13.7730661, -39.7063065),
    new GoogleMapsLatLng(-13.7804019, -39.721756),
    new GoogleMapsLatLng(-13.7540586, -39.7245026),
    new GoogleMapsLatLng(-13.7710653, -39.7488785),
    new GoogleMapsLatLng(-13.7743999, -39.7735977),
    new GoogleMapsLatLng(-13.7860703, -39.7931671),
    new GoogleMapsLatLng(-13.800074, -39.7948837),

  ];
  private jaguacara = [
    new GoogleMapsLatLng(-13.3241486, -39.9819946),
    new GoogleMapsLatLng(-13.2760361, -40.120697),
    new GoogleMapsLatLng(-13.318135, -40.1131439),
    new GoogleMapsLatLng(-13.3355071, -40.1049042),
    new GoogleMapsLatLng(-13.4363737, -40.1097107),
    new GoogleMapsLatLng(-13.4831187, -40.0733185),
    new GoogleMapsLatLng(-13.5218434, -40.1076508),
    new GoogleMapsLatLng(-13.5278518, -40.1158905),
    new GoogleMapsLatLng(-13.5659017, -40.1193237),
    new GoogleMapsLatLng(-13.5852581, -40.111084),
    new GoogleMapsLatLng(-13.6019434, -40.1124573),
    new GoogleMapsLatLng(-13.6166254, -40.1165771),
    new GoogleMapsLatLng(-13.6306393, -40.1138306),
    new GoogleMapsLatLng(-13.6466541, -40.109024),
    new GoogleMapsLatLng(-13.6586645, -40.1042175),
    new GoogleMapsLatLng(-13.6680055, -40.0980377),
    new GoogleMapsLatLng(-13.6453196, -40.0637054),
    new GoogleMapsLatLng(-13.6419832, -40.012207),
    new GoogleMapsLatLng(-13.6446523, -39.9936676),
    new GoogleMapsLatLng(-13.6646694, -39.9785614),
    new GoogleMapsLatLng(-13.6766789, -39.9421692),
    new GoogleMapsLatLng(-13.6766789, -39.9105835),
    new GoogleMapsLatLng(-13.643985, -39.8680115),
    new GoogleMapsLatLng(-13.643985, -39.8535919),
    new GoogleMapsLatLng(-13.732715, -39.8412323),
    new GoogleMapsLatLng(-13.7847365, -39.8123932),
    new GoogleMapsLatLng(-13.800074, -39.7948837),
    new GoogleMapsLatLng(-13.7860703, -39.7931671),
    new GoogleMapsLatLng(-13.7743999, -39.7735977),
    new GoogleMapsLatLng(-13.7710653, -39.7488785),
    new GoogleMapsLatLng(-13.7540586, -39.7245026),
    new GoogleMapsLatLng(-13.7804019, -39.721756),
    new GoogleMapsLatLng(-13.7730661, -39.7063065),
    new GoogleMapsLatLng(-13.78507, -39.6918869),
    new GoogleMapsLatLng(-13.7774009, -39.6860504),
    new GoogleMapsLatLng(-13.7760671, -39.6757507),
    new GoogleMapsLatLng(-13.7747333, -39.6606445),
    new GoogleMapsLatLng(-13.7733995, -39.6421051),
    new GoogleMapsLatLng(-13.7647296, -39.634552),
    new GoogleMapsLatLng(-13.7467219, -39.6235657),
    new GoogleMapsLatLng(-13.7300469, -39.6105194),
    new GoogleMapsLatLng(-13.7193743, -39.6050262),
    new GoogleMapsLatLng(-13.6860192, -39.5816803),
    new GoogleMapsLatLng(-13.6519921, -39.5755005),
    new GoogleMapsLatLng(-13.6353104, -39.6338654),
    new GoogleMapsLatLng(-13.5966042, -39.6551514),
    new GoogleMapsLatLng(-13.5572242, -39.6709442),
    new GoogleMapsLatLng(-13.5418709, -39.6647644),
    new GoogleMapsLatLng(-13.5318574, -39.6805573),
    new GoogleMapsLatLng(-13.5171701, -39.6949768),
    new GoogleMapsLatLng(-13.5191729, -39.710083),
    new GoogleMapsLatLng(-13.504151, -39.7258759),
    new GoogleMapsLatLng(-13.5071555, -39.7478485),
    new GoogleMapsLatLng(-13.5171701, -39.7677612),
    new GoogleMapsLatLng(-13.5318574, -39.7911072),
    new GoogleMapsLatLng(-13.573244, -39.8144531),
    new GoogleMapsLatLng(-13.5578917, -39.861145),
    new GoogleMapsLatLng(-13.4811156, -39.8989105),
    new GoogleMapsLatLng(-13.4804478, -39.9133301),
    new GoogleMapsLatLng(-13.4944697, -39.938736),
    new GoogleMapsLatLng(-13.463754, -39.9991608),
    new GoogleMapsLatLng(-13.4296951, -40.0005341),
    new GoogleMapsLatLng(-13.4243521, -39.992981),
    new GoogleMapsLatLng(-13.4036468, -39.9916077),
    new GoogleMapsLatLng(-13.3795997, -39.9758148),
    new GoogleMapsLatLng(-13.3635669, -39.9758148),
    new GoogleMapsLatLng(-13.3441926, -39.9840546),
    new GoogleMapsLatLng(-13.3381796, -39.9799347),
    new GoogleMapsLatLng(-13.3241486, -39.9819946),

  ];
  private lafaiateCoutinho = [
    new GoogleMapsLatLng(-13.4690962, -40.2381134),
    new GoogleMapsLatLng(-13.7120366, -40.5354309),
    new GoogleMapsLatLng(-13.707367, -40.5038452),
    new GoogleMapsLatLng(-13.7026973, -40.4866791),
    new GoogleMapsLatLng(-13.6893549, -40.4818726),
    new GoogleMapsLatLng(-13.6740102, -40.1165771),
    new GoogleMapsLatLng(-13.6419832, -40.1488495),
    new GoogleMapsLatLng(-13.6232988, -40.1598358),
    new GoogleMapsLatLng(-13.6019434, -40.1680756),
    new GoogleMapsLatLng(-13.5812535, -40.1673889),
    new GoogleMapsLatLng(-13.5612292, -40.1701355),
    new GoogleMapsLatLng(-13.4811156, -40.2085876),
    new GoogleMapsLatLng(-13.4731027, -40.2236938),
    new GoogleMapsLatLng(-13.4690962, -40.2381134),


  ];
  private lagedoDoTabocal = [
    new GoogleMapsLatLng(-13.4690962, -40.2381134),
    new GoogleMapsLatLng(-13.4604151, -40.2367401),
    new GoogleMapsLatLng(-13.4530694, -40.2236938),
    new GoogleMapsLatLng(-13.4410486, -40.2099609),
    new GoogleMapsLatLng(-13.430363, -40.2140808),
    new GoogleMapsLatLng(-13.4216805, -40.2278137),
    new GoogleMapsLatLng(-13.4043147, -40.2353668),
    new GoogleMapsLatLng(-13.3922915, -40.2230072),
    new GoogleMapsLatLng(-13.3896196, -40.207901),
    new GoogleMapsLatLng(-13.3622308, -40.1564026),
    new GoogleMapsLatLng(-13.3448607, -40.153656),
    new GoogleMapsLatLng(-13.3335027, -40.1763153),
    new GoogleMapsLatLng(-13.3141259, -40.2030945),
    new GoogleMapsLatLng(-13.310785, -40.2188873),
    new GoogleMapsLatLng(-13.2880651, -40.2442932),
    new GoogleMapsLatLng(-13.2840555, -40.2614594),
    new GoogleMapsLatLng(-13.2860603, -40.271759),
    new GoogleMapsLatLng(-13.3201396, -40.2854919),
    new GoogleMapsLatLng(-13.340852, -40.2848053),
    new GoogleMapsLatLng(-13.3455288, -40.2772522),
    new GoogleMapsLatLng(-13.3635669, -40.283432),
    new GoogleMapsLatLng(-13.3829397, -40.2882385),
    new GoogleMapsLatLng(-13.4136657, -40.2978516),
    new GoogleMapsLatLng(-13.451066, -40.3102112),
    new GoogleMapsLatLng(-13.463754, -40.3349304),
    new GoogleMapsLatLng(-13.4604151, -40.3582764),
    new GoogleMapsLatLng(-13.4590796, -40.380249),
    new GoogleMapsLatLng(-13.472435, -40.4056549),
    new GoogleMapsLatLng(-13.4951374, -40.4296875),
    new GoogleMapsLatLng(-13.5198405, -40.4413605),
    new GoogleMapsLatLng(-13.537198, -40.4605865),
    new GoogleMapsLatLng(-13.5605617, -40.4640198),
    new GoogleMapsLatLng(-13.5832558, -40.4695129),
    new GoogleMapsLatLng(-13.6199621, -40.4729462),
    new GoogleMapsLatLng(-13.7120366, -40.5354309),
    new GoogleMapsLatLng(-13.4690962, -40.2381134),

  ];
  private maracas = [
    new GoogleMapsLatLng(-13.1911478, -40.4942322),
    new GoogleMapsLatLng(-13.19917, -40.6082153),
    new GoogleMapsLatLng(-13.2319246, -40.6528473),
    new GoogleMapsLatLng(-13.2800458, -40.705719),
    new GoogleMapsLatLng(-13.3448607, -40.7572174),
    new GoogleMapsLatLng(-13.4063185, -40.7407379),
    new GoogleMapsLatLng(-13.4497304, -40.7311249),
    new GoogleMapsLatLng(-13.4811156, -40.7208252),
    new GoogleMapsLatLng(-13.5078231, -40.6967926),
    new GoogleMapsLatLng(-13.5538866, -40.6878662),
    new GoogleMapsLatLng(-13.6146234, -40.7002258),
    new GoogleMapsLatLng(-13.6466541, -40.7098389),
    new GoogleMapsLatLng(-13.6926906, -40.7221985),
    new GoogleMapsLatLng(-13.7300469, -40.736618),
    new GoogleMapsLatLng(-13.7560594, -40.738678),
    new GoogleMapsLatLng(-13.7860703, -40.7318115),
    new GoogleMapsLatLng(-13.800074, -40.7201385),
    new GoogleMapsLatLng(-13.8087426, -40.7043457),
    new GoogleMapsLatLng(-13.8494138, -40.6768799),
    new GoogleMapsLatLng(-13.8427469, -40.6624603),
    new GoogleMapsLatLng(-13.8327461, -40.6494141),
    new GoogleMapsLatLng(-13.8400801, -40.6384277),
    new GoogleMapsLatLng(-13.8494138, -40.6308746),
    new GoogleMapsLatLng(-13.8534139, -40.620575),
    new GoogleMapsLatLng(-13.8614138, -40.6109619),
    new GoogleMapsLatLng(-13.8627471, -40.597229),
    new GoogleMapsLatLng(-13.8674136, -40.5800629),
    new GoogleMapsLatLng(-13.8674136, -40.5649567),
    new GoogleMapsLatLng(-13.8654137, -40.5560303),
    new GoogleMapsLatLng(-13.864747, -40.5464172),
    new GoogleMapsLatLng(-13.8580806, -40.5402374),
    new GoogleMapsLatLng(-13.864747, -40.5251312),
    new GoogleMapsLatLng(-13.8794127, -40.5251312),
    new GoogleMapsLatLng(-13.8834122, -40.512085),
    new GoogleMapsLatLng(-13.8747464, -40.510025),
    new GoogleMapsLatLng(-13.8734132, -40.5010986),
    new GoogleMapsLatLng(-13.8767462, -40.4894257),
    new GoogleMapsLatLng(-13.8687468, -40.4681396),
    new GoogleMapsLatLng(-13.866747, -40.4523468),
    new GoogleMapsLatLng(-13.8547472, -40.4502869),
    new GoogleMapsLatLng(-13.7887377, -40.5271912),
    new GoogleMapsLatLng(-13.733382, -40.5388641),
    new GoogleMapsLatLng(-13.7120366, -40.5354309),
    new GoogleMapsLatLng(-13.6199621, -40.4729462),
    new GoogleMapsLatLng(-13.5832558, -40.4695129),
    new GoogleMapsLatLng(-13.5605617, -40.4640198),
    new GoogleMapsLatLng(-13.537198, -40.4605865),
    new GoogleMapsLatLng(-13.5198405, -40.4413605),
    new GoogleMapsLatLng(-13.4951374, -40.4296875),
    new GoogleMapsLatLng(-13.472435, -40.4056549),
    new GoogleMapsLatLng(-13.4590796, -40.380249),
    new GoogleMapsLatLng(-13.463754, -40.3349304),
    new GoogleMapsLatLng(-13.451066, -40.3102112),
    new GoogleMapsLatLng(-13.3455288, -40.2772522),
    new GoogleMapsLatLng(-13.340852, -40.2848053),
    new GoogleMapsLatLng(-13.3047711, -40.4084015),
    new GoogleMapsLatLng(-13.1911478, -40.4942322),


  ];
  private marcionilioSouza = [
    new GoogleMapsLatLng(-13.1911478, -40.4942322),
    new GoogleMapsLatLng(-13.1403345, -40.382309),
    new GoogleMapsLatLng(-13.1356538, -40.3946686),
    new GoogleMapsLatLng(-13.0941921, -40.4159546),
    new GoogleMapsLatLng(-13.0768029, -40.4276276),
    new GoogleMapsLatLng(-13.0487101, -40.4550934),
    new GoogleMapsLatLng(-13.022621, -40.4640198),
    new GoogleMapsLatLng(-13.0045577, -40.4804993),
    new GoogleMapsLatLng(-12.9764567, -40.5127716),
    new GoogleMapsLatLng(-12.9858241, -40.531311),
    new GoogleMapsLatLng(-12.9965292, -40.5402374),
    new GoogleMapsLatLng(-13.0038887, -40.5594635),
    new GoogleMapsLatLng(-13.0038887, -40.5821228),
    new GoogleMapsLatLng(-13.012586, -40.6130219),
    new GoogleMapsLatLng(-13.012586, -40.6356812),
    new GoogleMapsLatLng(-13.012586, -40.6576538),
    new GoogleMapsLatLng(-13.0259659, -40.6803131),
    new GoogleMapsLatLng(-13.0346625, -40.7077789),
    new GoogleMapsLatLng(-13.0393451, -40.7318115),
    new GoogleMapsLatLng(-13.0393451, -40.7537842),
    new GoogleMapsLatLng(-13.0426898, -40.7750702),
    new GoogleMapsLatLng(-13.0594125, -40.792923),
    new GoogleMapsLatLng(-13.0955297, -40.814209),
    new GoogleMapsLatLng(-13.1383285, -40.8602142),
    new GoogleMapsLatLng(-13.159725, -40.868454),
    new GoogleMapsLatLng(-13.1924849, -40.8856201),
    new GoogleMapsLatLng(-13.2232351, -40.9144592),
    new GoogleMapsLatLng(-13.2432874, -40.9000397),
    new GoogleMapsLatLng(-13.2680164, -40.880127),
    new GoogleMapsLatLng(-13.2954159, -40.8437347),
    new GoogleMapsLatLng(-13.3147941, -40.8375549),
    new GoogleMapsLatLng(-13.3274894, -40.8231354),
    new GoogleMapsLatLng(-13.330162, -40.7901764),
    new GoogleMapsLatLng(-13.3448607, -40.7572174),
    new GoogleMapsLatLng(-13.2800458, -40.705719),
    new GoogleMapsLatLng(-13.2319246, -40.6528473),
    new GoogleMapsLatLng(-13.19917, -40.6082153),
    new GoogleMapsLatLng(-13.1911478, -40.4942322),


  ];
  private jitauna = [
    new GoogleMapsLatLng(-13.8174108, -39.9243164),
    new GoogleMapsLatLng(-13.9187386, -40.0108337),
    new GoogleMapsLatLng(-13.9773817, -39.9497223),
    new GoogleMapsLatLng(-14.0080301, -39.9167633),
    new GoogleMapsLatLng(-14.0166909, -39.8892975),
    new GoogleMapsLatLng(-14.0073639, -39.8783112),
    new GoogleMapsLatLng(-14.0060315, -39.8659515),
    new GoogleMapsLatLng(-14.0140261, -39.8439789),
    new GoogleMapsLatLng(-14.0193557, -39.8323059),
    new GoogleMapsLatLng(-14.0306807, -39.828186),
    new GoogleMapsLatLng(-14.0406729, -39.8206329),
    new GoogleMapsLatLng(-14.046668, -39.8123932),
    new GoogleMapsLatLng(-14.053329, -39.8034668),
    new GoogleMapsLatLng(-14.0426713, -39.7931671),
    new GoogleMapsLatLng(-14.0293484, -39.7924805),
    new GoogleMapsLatLng(-14.0140261, -39.7890472),
    new GoogleMapsLatLng(-14.0033665, -39.7725677),
    new GoogleMapsLatLng(-13.9933727, -39.7608948),
    new GoogleMapsLatLng(-13.9813796, -39.7574615),
    new GoogleMapsLatLng(-13.8174108, -39.9243164),


  ];
  private aiquara = [
    new GoogleMapsLatLng(-14.0759751, -39.9414825),
    new GoogleMapsLatLng(-14.0593238, -39.9634552),
    new GoogleMapsLatLng(-14.1618766, -39.9634552),
    new GoogleMapsLatLng(-14.1838462, -39.91745),
    new GoogleMapsLatLng(-14.1339122, -39.8831177),
    new GoogleMapsLatLng(-14.1372415, -39.8645782),
    new GoogleMapsLatLng(-14.129917, -39.8419189),
    new GoogleMapsLatLng(-14.1205947, -39.8274994),
    new GoogleMapsLatLng(-14.1019487, -39.8048401),
    new GoogleMapsLatLng(-14.0939572, -39.8171997),
    new GoogleMapsLatLng(-14.0859653, -39.8261261),
    new GoogleMapsLatLng(-14.0773072, -39.8233795),
    new GoogleMapsLatLng(-14.0793052, -39.8117065),
    new GoogleMapsLatLng(-14.072645, -39.7966003),
    new GoogleMapsLatLng(-14.060656, -39.7904205),
    new GoogleMapsLatLng(-14.053329, -39.8034668),
    new GoogleMapsLatLng(-14.0406729, -39.8206329),
    new GoogleMapsLatLng(-14.0306807, -39.828186),
    new GoogleMapsLatLng(-14.0193557, -39.8323059),
    new GoogleMapsLatLng(-14.0123611, -39.8474126),
    new GoogleMapsLatLng(-14.0060315, -39.8659515),
    new GoogleMapsLatLng(-14.0073639, -39.8783112),
    new GoogleMapsLatLng(-14.0166909, -39.8892975),
    new GoogleMapsLatLng(-14.0280161, -39.903717),
    new GoogleMapsLatLng(-14.061322, -39.9188232),
    new GoogleMapsLatLng(-14.0759751, -39.9414825),

  ];
  private itagi = [
    new GoogleMapsLatLng(-14.2577282, -40.1014709),
    new GoogleMapsLatLng(-14.2643831, -40.078125),
    new GoogleMapsLatLng(-14.2557317, -40.0650787),
    new GoogleMapsLatLng(-14.2570627, -40.0499725),
    new GoogleMapsLatLng(-14.2617212, -40.0348663),
    new GoogleMapsLatLng(-14.2637176, -40.0012207),
    new GoogleMapsLatLng(-14.2563972, -39.9730682),
    new GoogleMapsLatLng(-14.2497421, -39.9538422),
    new GoogleMapsLatLng(-14.2390936, -39.927063),
    new GoogleMapsLatLng(-14.1838462, -39.91745),
    new GoogleMapsLatLng(-14.1618766, -39.9634552),
    new GoogleMapsLatLng(-14.0593238, -39.9634552),
    new GoogleMapsLatLng(-14.0386745, -39.9977875),
    new GoogleMapsLatLng(-13.9980365, -40.0410461),
    new GoogleMapsLatLng(-14.181849, -40.1007843),
    new GoogleMapsLatLng(-14.1925003, -40.0939178),
    new GoogleMapsLatLng(-14.1964944, -40.0863647),
    new GoogleMapsLatLng(-14.2164638, -40.0849915),
    new GoogleMapsLatLng(-14.2291101, -40.0904846),
    new GoogleMapsLatLng(-14.2437524, -40.0987244),
    new GoogleMapsLatLng(-14.2577282, -40.1014709),

  ];
  private itagiba = [
    new GoogleMapsLatLng(-14.2623867, -40.0067139),
    new GoogleMapsLatLng(-14.2876735, -40.0074005),
    new GoogleMapsLatLng(-14.3608563, -39.9572754),
    new GoogleMapsLatLng(-14.3608563, -39.9414825),
    new GoogleMapsLatLng(-14.3615215, -39.9201965),
    new GoogleMapsLatLng(-14.3714991, -39.8920441),
    new GoogleMapsLatLng(-14.3681733, -39.8618317),
    new GoogleMapsLatLng(-14.3768203, -39.8323059),
    new GoogleMapsLatLng(-14.3675081, -39.8034668),
    new GoogleMapsLatLng(-14.3768203, -39.7554016),
    new GoogleMapsLatLng(-14.3628519, -39.7052765),
    new GoogleMapsLatLng(-14.1811833, -39.6640778),
    new GoogleMapsLatLng(-14.177189, -39.6826172),
    new GoogleMapsLatLng(-14.1698658, -39.6949768),
    new GoogleMapsLatLng(-14.1585477, -39.6970367),
    new GoogleMapsLatLng(-14.1505581, -39.7059631),
    new GoogleMapsLatLng(-14.147229, -39.719696),
    new GoogleMapsLatLng(-14.1432341, -39.733429),
    new GoogleMapsLatLng(-14.1365757, -39.7464752),
    new GoogleMapsLatLng(-14.1305829, -39.7615814),
    new GoogleMapsLatLng(-14.1165992, -39.773941),
    new GoogleMapsLatLng(-14.1052785, -39.7794342),
    new GoogleMapsLatLng(-14.1019487, -39.8048401),
    new GoogleMapsLatLng(-14.10994, -39.8171997),
    new GoogleMapsLatLng(-14.1205947, -39.8274994),
    new GoogleMapsLatLng(-14.129917, -39.8419189),
    new GoogleMapsLatLng(-14.1372415, -39.8645782),
    new GoogleMapsLatLng(-14.1339122, -39.8831177),
    new GoogleMapsLatLng(-14.1838462, -39.91745),
    new GoogleMapsLatLng(-14.2390936, -39.927063),
    new GoogleMapsLatLng(-14.2497421, -39.9538422),
    new GoogleMapsLatLng(-14.2563972, -39.9730682),
    new GoogleMapsLatLng(-14.2637176, -40.0012207),
    new GoogleMapsLatLng(-14.2623867, -40.0067139),

  ];
  private darioMeira = [
    new GoogleMapsLatLng(-14.4519688, -39.8419189),
    new GoogleMapsLatLng(-14.3768203, -39.8323059),
    new GoogleMapsLatLng(-14.3681733, -39.8618317),
    new GoogleMapsLatLng(-14.3714991, -39.8920441),
    new GoogleMapsLatLng(-14.3615215, -39.9201965),
    new GoogleMapsLatLng(-14.3608563, -39.9572754),
    new GoogleMapsLatLng(-14.2876735, -40.0074005),
    new GoogleMapsLatLng(-14.2623867, -40.0067139),
    new GoogleMapsLatLng(-14.2617212, -40.02388),
    new GoogleMapsLatLng(-14.2617212, -40.0348663),
    new GoogleMapsLatLng(-14.2570627, -40.0499725),
    new GoogleMapsLatLng(-14.2557317, -40.0650787),
    new GoogleMapsLatLng(-14.2643831, -40.078125),
    new GoogleMapsLatLng(-14.4433247, -40.033493),
    new GoogleMapsLatLng(-14.4419948, -40.0437927),
    new GoogleMapsLatLng(-14.4552933, -40.0492859),
    new GoogleMapsLatLng(-14.4732451, -40.0540924),
    new GoogleMapsLatLng(-14.5330739, -40.0966644),
    new GoogleMapsLatLng(-14.5344033, -40.0410461),
    new GoogleMapsLatLng(-14.5310799, -40.0149536),
    new GoogleMapsLatLng(-14.5124681, -40.0128937),
    new GoogleMapsLatLng(-14.515127, -39.9950409),
    new GoogleMapsLatLng(-14.4898659, -39.9737549),
    new GoogleMapsLatLng(-14.4925251, -39.9559021),
    new GoogleMapsLatLng(-14.4552933, -39.9298096),
    new GoogleMapsLatLng(-14.43867, -39.9208832),
    new GoogleMapsLatLng(-14.438005, -39.905777),
    new GoogleMapsLatLng(-14.4426597, -39.8934174),
    new GoogleMapsLatLng(-14.4479792, -39.8769379),
    new GoogleMapsLatLng(-14.4539635, -39.8618317),
    new GoogleMapsLatLng(-14.4519688, -39.8419189),


  ];
  private manoelVitorino = [
    new GoogleMapsLatLng(-14.0599899, -40.3905487),
    new GoogleMapsLatLng(-13.9274027, -40.5141449),
    new GoogleMapsLatLng(-13.9180721, -40.5182648),
    new GoogleMapsLatLng(-13.9054085, -40.5052185),
    new GoogleMapsLatLng(-13.8980766, -40.5052185),
    new GoogleMapsLatLng(-13.8967435, -40.5127716),
    new GoogleMapsLatLng(-13.8967435, -40.5278778),
    new GoogleMapsLatLng(-13.9040754, -40.5395508),
    new GoogleMapsLatLng(-13.8934108, -40.5457306),
    new GoogleMapsLatLng(-13.8840788, -40.5388641),
    new GoogleMapsLatLng(-13.8727466, -40.5374908),
    new GoogleMapsLatLng(-13.8800792, -40.5519104),
    new GoogleMapsLatLng(-13.8807458, -40.56633),
    new GoogleMapsLatLng(-13.8774129, -40.5793762),
    new GoogleMapsLatLng(-13.8727466, -40.5917358),
    new GoogleMapsLatLng(-13.8707467, -40.6047821),
    new GoogleMapsLatLng(-13.8794127, -40.6095886),
    new GoogleMapsLatLng(-13.8660803, -40.6192017),
    new GoogleMapsLatLng(-13.8580806, -40.6192017),
    new GoogleMapsLatLng(-13.8540806, -40.6322479),
    new GoogleMapsLatLng(-13.8380799, -40.6487274),
    new GoogleMapsLatLng(-13.8520806, -40.6720734),
    new GoogleMapsLatLng(-13.8540806, -40.684433),
    new GoogleMapsLatLng(-13.8454137, -40.6919861),
    new GoogleMapsLatLng(-13.8394134, -40.7029724),
    new GoogleMapsLatLng(-13.8454137, -40.7139587),
    new GoogleMapsLatLng(-13.8440803, -40.7242584),
    new GoogleMapsLatLng(-13.8327461, -40.7283783),
    new GoogleMapsLatLng(-13.8407468, -40.7407379),
    new GoogleMapsLatLng(-13.8380799, -40.7757568),
    new GoogleMapsLatLng(-13.8380799, -40.7936096),
    new GoogleMapsLatLng(-13.8414135, -40.8128357),
    new GoogleMapsLatLng(-13.8454137, -40.8286285),
    new GoogleMapsLatLng(-13.8534139, -40.8506012),
    new GoogleMapsLatLng(-13.8520806, -40.8650208),
    new GoogleMapsLatLng(-13.8487471, -40.8746338),
    new GoogleMapsLatLng(-13.8520806, -40.8842468),
    new GoogleMapsLatLng(-13.8654137, -40.8842468),
    new GoogleMapsLatLng(-13.875413, -40.8904266),
    new GoogleMapsLatLng(-13.8887448, -40.901413),
    new GoogleMapsLatLng(-13.8954104, -40.9172058),
    new GoogleMapsLatLng(-13.896077, -40.9302521),
    new GoogleMapsLatLng(-13.9054085, -40.9261322),
    new GoogleMapsLatLng(-13.9020759, -40.9151459),
    new GoogleMapsLatLng(-13.9094076, -40.9096527),
    new GoogleMapsLatLng(-13.9180721, -40.9151459),
    new GoogleMapsLatLng(-13.922071, -40.9261322),
    new GoogleMapsLatLng(-13.9160726, -40.9357452),
    new GoogleMapsLatLng(-13.9100741, -40.9453583),
    new GoogleMapsLatLng(-13.9174056, -40.9515381),
    new GoogleMapsLatLng(-13.9260698, -40.9584045),
    new GoogleMapsLatLng(-13.9413979, -40.9638977),
    new GoogleMapsLatLng(-13.94473, -40.9735107),
    new GoogleMapsLatLng(-13.956725, -40.9741974),
    new GoogleMapsLatLng(-13.9667204, -40.976944),
    new GoogleMapsLatLng(-13.980047, -40.9776306),
    new GoogleMapsLatLng(-14.3116269, -40.2401733),
    new GoogleMapsLatLng(-14.2264478, -40.1886749),
    new GoogleMapsLatLng(-14.1612108, -40.1694489),
    new GoogleMapsLatLng(-14.1239241, -40.1797485),
    new GoogleMapsLatLng(-14.1219265, -40.2264404),
    new GoogleMapsLatLng(-14.0586577, -40.2044678),
    new GoogleMapsLatLng(-14.0386745, -40.2030945),
    new GoogleMapsLatLng(-14.032013, -40.2257538),
    new GoogleMapsLatLng(-14.0373422, -40.2497864),
    new GoogleMapsLatLng(-14.0100288, -40.3054047),
    new GoogleMapsLatLng(-14.0073639, -40.316391),
    new GoogleMapsLatLng(-14.0153585, -40.3225708),
    new GoogleMapsLatLng(-14.0220205, -40.3397369),
    new GoogleMapsLatLng(-14.0326792, -40.34935),
    new GoogleMapsLatLng(-14.0513307, -40.3610229),
    new GoogleMapsLatLng(-14.0599899, -40.3905487),

  ];
  private boaNova = [
    new GoogleMapsLatLng(-14.3695036, -40.4832458),
    new GoogleMapsLatLng(-14.41074, -40.4008484),
    new GoogleMapsLatLng(-14.4532986, -40.2992249),
    new GoogleMapsLatLng(-14.5184506, -40.177002),
    new GoogleMapsLatLng(-14.5330739, -40.0966644),
    new GoogleMapsLatLng(-14.4732451, -40.0540924),
    new GoogleMapsLatLng(-14.4552933, -40.0492859),
    new GoogleMapsLatLng(-14.4419948, -40.0437927),
    new GoogleMapsLatLng(-14.4433247, -40.033493),
    new GoogleMapsLatLng(-14.2643831, -40.078125),
    new GoogleMapsLatLng(-14.2577282, -40.1014709),
    new GoogleMapsLatLng(-14.2311069, -40.1186371),
    new GoogleMapsLatLng(-14.2410902, -40.1282501),
    new GoogleMapsLatLng(-14.2544007, -40.1584625),
    new GoogleMapsLatLng(-14.2264478, -40.1886749),
    new GoogleMapsLatLng(-14.3116269, -40.2401733),
    new GoogleMapsLatLng(-14.2264478, -40.4283142),
    new GoogleMapsLatLng(-14.3695036, -40.4832458),


  ];
  private mirante = [
    new GoogleMapsLatLng(-13.980047, -40.9776306),
    new GoogleMapsLatLng(-14.0000353, -40.9899902),
    new GoogleMapsLatLng(-14.0066977, -40.9947968),
    new GoogleMapsLatLng(-14.0146923, -40.9783173),
    new GoogleMapsLatLng(-14.0286822, -40.9721375),
    new GoogleMapsLatLng(-14.0366761, -40.9810638),
    new GoogleMapsLatLng(-14.0426713, -40.9913635),
    new GoogleMapsLatLng(-14.0546612, -41.009903),
    new GoogleMapsLatLng(-14.0599899, -40.9954834),
    new GoogleMapsLatLng(-14.0706468, -40.9968567),
    new GoogleMapsLatLng(-14.0746431, -41.0147095),
    new GoogleMapsLatLng(-14.0879633, -41.007843),
    new GoogleMapsLatLng(-14.1006168, -41.0181427),
    new GoogleMapsLatLng(-14.1039466, -41.0298157),
    new GoogleMapsLatLng(-14.1066104, -41.0490417),
    new GoogleMapsLatLng(-14.1112719, -41.0641479),
    new GoogleMapsLatLng(-14.1252559, -41.0847473),
    new GoogleMapsLatLng(-14.1312488, -41.1005402),
    new GoogleMapsLatLng(-14.1285853, -41.1170197),
    new GoogleMapsLatLng(-14.1458974, -41.1328125),
    new GoogleMapsLatLng(-14.1525555, -41.1403656),
    new GoogleMapsLatLng(-14.1612108, -41.1431122),
    new GoogleMapsLatLng(-14.1692, -41.1286926),
    new GoogleMapsLatLng(-14.174526, -41.1115265),
    new GoogleMapsLatLng(-14.1738603, -41.0916138),
    new GoogleMapsLatLng(-14.1898375, -41.0785675),
    new GoogleMapsLatLng(-14.2091419, -41.0668945),
    new GoogleMapsLatLng(-14.2304413, -41.052475),
    new GoogleMapsLatLng(-14.2424213, -41.0277557),
    new GoogleMapsLatLng(-14.2677104, -41.0153961),
    new GoogleMapsLatLng(-14.2843465, -40.99617),
    new GoogleMapsLatLng(-14.2890043, -40.9790039),
    new GoogleMapsLatLng(-14.3102962, -40.9364319),
    new GoogleMapsLatLng(-14.3242679, -40.9123993),
    new GoogleMapsLatLng(-14.3342472, -40.8753204),
    new GoogleMapsLatLng(-14.344226, -40.8300018),
    new GoogleMapsLatLng(-14.3482174, -40.7949829),
    new GoogleMapsLatLng(-14.3462217, -40.759964),
    new GoogleMapsLatLng(-14.3269291, -40.7290649),
    new GoogleMapsLatLng(-14.3335819, -40.6885529),
    new GoogleMapsLatLng(-14.3542044, -40.6755066),
    new GoogleMapsLatLng(-14.3548696, -40.6487274),
    new GoogleMapsLatLng(-14.3448912, -40.6281281),
    new GoogleMapsLatLng(-14.3369082, -40.6116486),
    new GoogleMapsLatLng(-14.3548696, -40.5731964),
    new GoogleMapsLatLng(-14.366843, -40.5615234),
    new GoogleMapsLatLng(-14.3821414, -40.5319977),
    new GoogleMapsLatLng(-14.3695036, -40.4832458),
    new GoogleMapsLatLng(-14.2264478, -40.4283142),
    new GoogleMapsLatLng(-13.980047, -40.9776306),

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

      //Codigo para retornar a posição atual do celular
      Geolocation.getCurrentPosition().then(pos => {
        this._latitude = pos.coords.latitude;
        this._longitude = pos.coords.longitude;
      })

      // move the camera
      map.moveCamera({
        //target: new GoogleMapsLatLng(-13.862530, -40.082864),
        target: new GoogleMapsLatLng(this._latitude, this._longitude),
        zoom: 8,
        tilt: 30
      }).then(() => {

        //add a marker
        map.addMarker({
          position: new GoogleMapsLatLng(this._latitude, this._longitude),
          title: 'Você está aqui!'
        }).then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });


        //Add Polygons
        map.addPolygon({
          points: this.mirante,
          strokeColor: '#FFA54F',
          strokeWidth: 5,
          fillColor: '#FFA54F'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Mirante');
            });
        });
        map.addPolygon({
          points: this.boaNova,
          strokeColor: '#FFA54F',
          strokeWidth: 5,
          fillColor: '#FFA54F'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Boa Nova');
            });
        });
        map.addPolygon({
          points: this.manoelVitorino,
          strokeColor: '#FFA54F',
          strokeWidth: 5,
          fillColor: '#FFA54F'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Manoel Vitorino');
            });
        });
        map.addPolygon({
          points: this.darioMeira,
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Dário Meira');
            });
        });
        map.addPolygon({
          points: this.itagiba,
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itagiba');
            });
        });
        map.addPolygon({
          points: this.itagi,
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itagi');
            });
        });
        map.addPolygon({
          points: this.aiquara,
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Aiquara');
            });
        });
        map.addPolygon({
          points: this.jitauna,
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Jitauna');
            });
        });
        map.addPolygon({
          points: this.marcionilioSouza,
          strokeColor: '#87CEFA',
          strokeWidth: 5,
          fillColor: '#87CEFA'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Marcionilio Souza');
            });
        });
        map.addPolygon({
          points: this.maracas,
          strokeColor: '#87CEFA',
          strokeWidth: 5,
          fillColor: '#87CEFA'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Maracas');
            });
        });
        map.addPolygon({
          points: this.lagedoDoTabocal,
          strokeColor: '#87CEFA',
          strokeWidth: 5,
          fillColor: '#87CEFA'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Lagedo do Tabocal');
            });
        });
        map.addPolygon({
          points: this.lafaiateCoutinho,
          strokeColor: '#FFD700',
          strokeWidth: 5,
          fillColor: '#FFD700'
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
          strokeColor: '#43CD80',
          strokeWidth: 5,
          fillColor: '#43CD80'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Apuarema');
            });
        });
        map.addPolygon({
          points: this.jequie,
          strokeColor: '#FFD700',
          strokeWidth: 5,
          fillColor: '#FFD700'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Jequié');
            });
        });
        map.addPolygon({
          points: this.itirucu,
          strokeColor: '#87CEFA',
          strokeWidth: 5,
          fillColor: '#87CEFA'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Itiruçu');
            });
        });
        map.addPolygon({
          points: this.planaltino,
          strokeColor: '#87CEFA',
          strokeWidth: 5,
          fillColor: '#87CEFA'
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
          strokeColor: '#66cdaa',
          strokeWidth: 5,
          fillColor: '#66cdaa'
        }).then((polygon: GoogleMapsPolygon) => {
          polygon.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
            () => {
              this.selecionar('Nova Itarana');
            });
        });
        map.addPolygon({
          points: this.irajuba,
          strokeColor: '#66cdaa',
          strokeWidth: 5,
          fillColor: '#66cdaa'
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

  selecionar(cidade: string) {
    //funcão ao selecionar a cidade
    this.navCtrl.push(EditarForaniaPage, {nomeCidade: cidade});
  }

  lista(){
    this.navCtrl.setRoot(BuscaPage);
  }

}
