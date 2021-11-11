import '../address_page/address_page_widget.dart';
import '../flutter_flow/flutter_flow_icon_button.dart';
import '../flutter_flow/flutter_flow_theme.dart';
import '../flutter_flow/flutter_flow_util.dart';
import '../flutter_flow/custom_functions.dart' as functions;
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class HomePageWidget extends StatefulWidget {
  static const String route = '/overview';

  HomePageWidget({Key key}) : super(key: key);

  bool donationHeart = false;

  @override
  _HomePageWidgetState createState() => _HomePageWidgetState();
}

class _HomePageWidgetState extends State<HomePageWidget> {
  TextEditingController textController;
  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    textController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            Align(
              alignment: AlignmentDirectional(0, 0),
              child: Container(
                constraints: BoxConstraints(
                  maxWidth: 500,
                ),
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.ghostWhite,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Padding(
                      padding: EdgeInsetsDirectional.fromSTEB(0, 45, 0, 25),
                      child: Container(
                        width: double.infinity,
                        height: 100,
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.spaceCadet,
                          boxShadow: [
                            BoxShadow(
                              blurRadius: 5,
                              color: Colors.black,
                              spreadRadius: 0.5,
                            )
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Padding(
                              padding: EdgeInsetsDirectional.fromSTEB(
                                  10, 10, 10, 10),
                              child: SvgPicture.network(
                                'https://www.stakeborgdao.com/wp-content/themes/stakeborgdao/assets/images/stakeborg-dark-bg.svg',
                                fit: BoxFit.cover,
                              ),
                            ),
                            Column(
                              mainAxisSize: MainAxisSize.max,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  children: [
                                    Text(
                                      'Stakeborg',
                                      style: FlutterFlowTheme.title1.override(
                                        fontFamily: 'Poppins',
                                        color: FlutterFlowTheme.white,
                                      ),
                                    ),
                                    Text(
                                      'DAO',
                                      style: FlutterFlowTheme.title1.override(
                                        fontFamily: 'Poppins',
                                        color: FlutterFlowTheme.primaryColor,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    )
                                  ],
                                ),
                                Text(
                                  'Explorer',
                                  style: FlutterFlowTheme.title2.override(
                                    fontFamily: 'Poppins',
                                    color: FlutterFlowTheme.azure,
                                    fontWeight: FontWeight.normal,
                                  ),
                                ),
                                FutureBuilder<String>(
                                  future:
                                      functions.getUserAddress(), // async work
                                  builder: (BuildContext context,
                                      AsyncSnapshot<String> snapshot) {
                                    switch (snapshot.connectionState) {
                                      case ConnectionState.waiting:
                                        return Text(
                                          'Loading...',
                                          style: FlutterFlowTheme.bodyText1
                                              .override(
                                            fontFamily: 'Poppins',
                                            color: FlutterFlowTheme.white,
                                          ),
                                        );
                                      default:
                                        if (snapshot.hasError)
                                          return Text(
                                            'Error: ${snapshot.error}',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.white,
                                            ),
                                          );
                                        else
                                          return Text(
                                            '${snapshot.data}',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.white,
                                            ),
                                          );
                                    }
                                  },
                                )
                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                    Column(
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(12, 0, 12, 0),
                          child: Container(
                            width: double.infinity,
                            decoration: BoxDecoration(),
                            child: Text(
                              'Search for an address to see information about it',
                              textAlign: TextAlign.start,
                              style: FlutterFlowTheme.bodyText1.override(
                                fontFamily: 'Poppins',
                                color: Color(0xFF222E50),
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(10, 10, 10, 10),
                          child: Container(
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: FlutterFlowTheme.white,
                              boxShadow: [
                                BoxShadow(
                                  blurRadius: 2,
                                  color: FlutterFlowTheme.tertiaryColor,
                                  spreadRadius: 0.05,
                                )
                              ],
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: Padding(
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(5, 0, 5, 0),
                              child: TextFormField(
                                onChanged: (_) => {},
                                onFieldSubmitted: (_) async {
                                  await Navigator.push(
                                    context,
                                    PageTransition(
                                      type: PageTransitionType.bottomToTop,
                                      duration: Duration(milliseconds: 300),
                                      reverseDuration:
                                          Duration(milliseconds: 300),
                                      child: AddressPageWidget(
                                        inputAddress: textController.text,
                                      ),
                                    ),
                                  );
                                },
                                controller: textController,
                                obscureText: false,
                                decoration: InputDecoration(
                                  hintText: '0xDeAdBeEf...',
                                  hintStyle:
                                      FlutterFlowTheme.bodyText1.override(
                                    fontFamily: 'Poppins',
                                    color: Color(0xFF7D7D7D),
                                  ),
                                  enabledBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(
                                      color: Color(0x00000000),
                                      width: 1,
                                    ),
                                    borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(4.0),
                                      topRight: Radius.circular(4.0),
                                    ),
                                  ),
                                  focusedBorder: UnderlineInputBorder(
                                    borderSide: BorderSide(
                                      color: Color(0x00000000),
                                      width: 1,
                                    ),
                                    borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(4.0),
                                      topRight: Radius.circular(4.0),
                                    ),
                                  ),
                                  suffixIcon: textController.text.isNotEmpty
                                      ? InkWell(
                                          onTap: () => setState(
                                            () => textController.clear(),
                                          ),
                                          child: Icon(
                                            Icons.clear,
                                            color:
                                                FlutterFlowTheme.primaryColor,
                                            size: 22,
                                          ),
                                        )
                                      : null,
                                ),
                                style: FlutterFlowTheme.bodyText1.override(
                                  fontFamily: 'Poppins',
                                  color: FlutterFlowTheme.primaryColor,
                                ),
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(12, 0, 12, 0),
                          child: Container(
                            width: double.infinity,
                            decoration: BoxDecoration(),
                            child: Text(
                              '...or check out other stats about the STANDARD token',
                              textAlign: TextAlign.start,
                              style: FlutterFlowTheme.bodyText1,
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(10, 10, 10, 10),
                          child: GridView(
                            padding: EdgeInsets.zero,
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 10,
                              mainAxisSpacing: 10,
                              childAspectRatio: 2,
                            ),
                            primary: false,
                            shrinkWrap: true,
                            scrollDirection: Axis.vertical,
                            children: [
                              Padding(
                                padding:
                                    EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Color(0xFFE3E3E3),
                                    boxShadow: [
                                      BoxShadow(
                                        blurRadius: 2,
                                        color: FlutterFlowTheme.tertiaryColor,
                                        spreadRadius: 0.05,
                                      )
                                    ],
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  alignment: AlignmentDirectional(0, 0),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Top holders',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: Color(0xFF7D7D7D),
                                        ),
                                      ),
                                      Text(
                                        'Coming soon',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: FlutterFlowTheme.antiqueRuby,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                              Padding(
                                padding:
                                    EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                                child: Container(
                                  height: 10,
                                  decoration: BoxDecoration(
                                    color: Color(0xFFE3E3E3),
                                    boxShadow: [
                                      BoxShadow(
                                        blurRadius: 2,
                                        color: FlutterFlowTheme.tertiaryColor,
                                        spreadRadius: 0.05,
                                      )
                                    ],
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  alignment: AlignmentDirectional(0, 0),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Liquidity pool stats',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: Color(0xFF7D7D7D),
                                        ),
                                      ),
                                      Text(
                                        'Coming soon',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: FlutterFlowTheme.hunterGreen,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                              Padding(
                                padding:
                                    EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                                child: Container(
                                  height: 10,
                                  decoration: BoxDecoration(
                                    color: Color(0xFFE3E3E3),
                                    boxShadow: [
                                      BoxShadow(
                                        blurRadius: 2,
                                        color: FlutterFlowTheme.tertiaryColor,
                                        spreadRadius: 0.05,
                                      )
                                    ],
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  alignment: AlignmentDirectional(0, 0),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Liquidity farms stats',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: Color(0xFF7D7D7D),
                                        ),
                                      ),
                                      Text(
                                        'Coming soon',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: FlutterFlowTheme.sandyBrown,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                              Padding(
                                padding:
                                    EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                                child: Container(
                                  height: 10,
                                  decoration: BoxDecoration(
                                    color: Color(0xFFE3E3E3),
                                    boxShadow: [
                                      BoxShadow(
                                        blurRadius: 2,
                                        color: FlutterFlowTheme.tertiaryColor,
                                        spreadRadius: 0.05,
                                      )
                                    ],
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  alignment: AlignmentDirectional(0, 0),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.max,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Staking stats',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: Color(0xFF7D7D7D),
                                        ),
                                      ),
                                      Text(
                                        'Coming soon',
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
                                          fontFamily: 'Poppins',
                                          color: FlutterFlowTheme.spaceCadet,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                    // Generated code for this Column Widget...
                    Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(12, 12, 12, 12),
                          child: Container(
                            decoration: BoxDecoration(
                              color: FlutterFlowTheme.white,
                              boxShadow: [
                                BoxShadow(
                                  blurRadius: 2,
                                  color: FlutterFlowTheme.tertiaryColor,
                                  spreadRadius: 0.05,
                                )
                              ],
                              borderRadius: BorderRadius.circular(5),
                            ),
                            alignment: AlignmentDirectional(0, 0),
                            child: Padding(
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Current price',
                                    style: FlutterFlowTheme.bodyText1.override(
                                      fontFamily: 'Poppins',
                                      color: Color(0xFF7D7D7D),
                                    ),
                                  ),
                                  FutureBuilder<String>(
                                    future: functions
                                        .getCurrentPrice(), // async work
                                    builder: (BuildContext context,
                                        AsyncSnapshot<String> snapshot) {
                                      switch (snapshot.connectionState) {
                                        case ConnectionState.waiting:
                                          return Text(
                                            'Loading...',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.azure,
                                            ),
                                          );
                                        default:
                                          if (snapshot.hasError)
                                            return Text(
                                              'Error: ${snapshot.error}',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                          else
                                            return Text(
                                              '${snapshot.data} \$',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                      }
                                    },
                                  )
                                ],
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(12, 12, 12, 12),
                          child: Container(
                            decoration: BoxDecoration(
                              color: FlutterFlowTheme.white,
                              boxShadow: [
                                BoxShadow(
                                  blurRadius: 2,
                                  color: FlutterFlowTheme.tertiaryColor,
                                  spreadRadius: 0.05,
                                )
                              ],
                              borderRadius: BorderRadius.circular(5),
                            ),
                            alignment: AlignmentDirectional(0, 0),
                            child: Padding(
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Current marketcap',
                                    style: FlutterFlowTheme.bodyText1.override(
                                      fontFamily: 'Poppins',
                                      color: Color(0xFF7D7D7D),
                                    ),
                                  ),
                                  FutureBuilder<String>(
                                    future: functions
                                        .getCurrentMcap(), // async work
                                    builder: (BuildContext context,
                                        AsyncSnapshot<String> snapshot) {
                                      switch (snapshot.connectionState) {
                                        case ConnectionState.waiting:
                                          return Text(
                                            'Loading...',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.azure,
                                            ),
                                          );
                                        default:
                                          if (snapshot.hasError)
                                            return Text(
                                              'Error: ${snapshot.error}',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                          else
                                            return Text(
                                              '${snapshot.data} \$',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                      }
                                    },
                                  )
                                ],
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(12, 12, 12, 12),
                          child: Container(
                            decoration: BoxDecoration(
                              color: FlutterFlowTheme.white,
                              boxShadow: [
                                BoxShadow(
                                  blurRadius: 2,
                                  color: FlutterFlowTheme.tertiaryColor,
                                  spreadRadius: 0.05,
                                )
                              ],
                              borderRadius: BorderRadius.circular(5),
                            ),
                            alignment: AlignmentDirectional(0, 0),
                            child: Padding(
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Circulating marketcap',
                                    style: FlutterFlowTheme.bodyText1.override(
                                      fontFamily: 'Poppins',
                                      color: Color(0xFF7D7D7D),
                                    ),
                                  ),
                                  FutureBuilder<String>(
                                    future: functions
                                        .getCurrentCirculatingMcap(), // async work
                                    builder: (BuildContext context,
                                        AsyncSnapshot<String> snapshot) {
                                      switch (snapshot.connectionState) {
                                        case ConnectionState.waiting:
                                          return Text(
                                            'Loading...',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.azure,
                                            ),
                                          );
                                        default:
                                          if (snapshot.hasError)
                                            return Text(
                                              'Error: ${snapshot.error}',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                          else
                                            return Text(
                                              '${snapshot.data} \$',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                      }
                                    },
                                  )
                                ],
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding:
                              EdgeInsetsDirectional.fromSTEB(12, 12, 12, 12),
                          child: Container(
                            decoration: BoxDecoration(
                              color: FlutterFlowTheme.white,
                              boxShadow: [
                                BoxShadow(
                                  blurRadius: 2,
                                  color: FlutterFlowTheme.tertiaryColor,
                                  spreadRadius: 0.05,
                                )
                              ],
                              borderRadius: BorderRadius.circular(5),
                            ),
                            alignment: AlignmentDirectional(0, 0),
                            child: Padding(
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                              child: Column(
                                mainAxisSize: MainAxisSize.max,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Current TVL',
                                    style: FlutterFlowTheme.bodyText1.override(
                                      fontFamily: 'Poppins',
                                      color: Color(0xFF7D7D7D),
                                    ),
                                  ),
                                  FutureBuilder<String>(
                                    future:
                                        functions.getCurrentTvl(), // async work
                                    builder: (BuildContext context,
                                        AsyncSnapshot<String> snapshot) {
                                      switch (snapshot.connectionState) {
                                        case ConnectionState.waiting:
                                          return Text(
                                            'Loading...',
                                            style: FlutterFlowTheme.bodyText1
                                                .override(
                                              fontFamily: 'Poppins',
                                              color: FlutterFlowTheme.azure,
                                            ),
                                          );
                                        default:
                                          if (snapshot.hasError)
                                            return Text(
                                              'Error: ${snapshot.error}',
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                          else
                                            return Text(
                                              '${snapshot.data}',
                                              textAlign: TextAlign.center,
                                              style: FlutterFlowTheme.bodyText1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.azure,
                                              ),
                                            );
                                      }
                                    },
                                  )
                                ],
                              ),
                            ),
                          ),
                        )
                      ],
                    )
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsetsDirectional.fromSTEB(12, 12, 12, 12),
              child: Container(
                constraints: BoxConstraints(
                  maxWidth: 700,
                ),
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.ghostWhite,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'Like this app? Consider supporting me at the address below. It will help improve this app and build more apps for the StakeborgDAO community. Thank you!  ❤️',
                      style: FlutterFlowTheme.bodyText1,
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Image.network(
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
                            width: 25,
                            height: 25,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Image.network(
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
                            width: 25,
                            height: 25,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Image.network(
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
                            width: 25,
                            height: 25,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(5, 0, 5, 0),
                          child: Text(
                            '0x7a3a59fc82ed8c2b1a4259f2dfa9a984527d8f04',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.azure,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        !widget.donationHeart
                            ? FlutterFlowIconButton(
                                borderColor: Colors.transparent,
                                borderRadius: 30,
                                borderWidth: 1,
                                buttonSize: 50,
                                fillColor: Color(0xBE3B85EB),
                                icon: Icon(
                                  Icons.content_copy,
                                  color: FlutterFlowTheme.white,
                                  size: 20,
                                ),
                                onPressed: () {
                                  setState(() {
                                    widget.donationHeart = true;
                                  });
                                },
                              )
                            : Lottie.network(
                                'https://assets6.lottiefiles.com/datafiles/nZgj7wTd56UtH6m/data.json',
                                height: 75,
                                fit: BoxFit.fill,
                                animate: true,
                              )
                      ],
                    ),
                    Text(
                      'Built using Flutter.',
                      style: FlutterFlowTheme.bodyText1,
                    ),
                    Text(
                      'Source code available at @andreivdev on github.',
                      style: FlutterFlowTheme.bodyText1,
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
