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

class AddressPageWidget extends StatefulWidget {
  static const String route = '/address';

  AddressPageWidget({
    Key key,
    this.inputAddress,
  }) : super(key: key);

  final String inputAddress;
  bool donationHeart = false;

  @override
  _AddressPageWidgetState createState() => _AddressPageWidgetState();
}

class _AddressPageWidgetState extends State<AddressPageWidget> {
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
      appBar: AppBar(
        backgroundColor: Color(0xFF3A4E86),
        automaticallyImplyLeading: true,
        actions: [],
        centerTitle: true,
        elevation: 4,
      ),
      backgroundColor: FlutterFlowTheme.ghostWhite,
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
                                onChanged: (_) => setState(() {}),
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
                        )
                      ],
                    )
                  ],
                ),
              ),
            ),
            Container(
              decoration: BoxDecoration(
                color: FlutterFlowTheme.ghostWhite,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Text(
                    widget.inputAddress,
                    style: FlutterFlowTheme.title3.override(
                      fontFamily: 'Poppins',
                      color: FlutterFlowTheme.primaryColor,
                      fontSize: 20,
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      color: FlutterFlowTheme.primaryColor,
                    ),
                    child: Padding(
                      padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                      child: Text(
                        'owns',
                        style: FlutterFlowTheme.subtitle1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.white,
                          fontSize: 24,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      FutureBuilder<String>(
                        future: functions.getTokensInWallet(
                            widget.inputAddress), // async work
                        builder: (BuildContext context,
                            AsyncSnapshot<String> snapshot) {
                          switch (snapshot.connectionState) {
                            case ConnectionState.waiting:
                              return Text(
                                'Loading...',
                                style: FlutterFlowTheme.title3.override(
                                  fontFamily: 'Poppins',
                                  color: FlutterFlowTheme.primaryColor,
                                ),
                              );
                            default:
                              if (snapshot.hasError)
                                return Text(
                                  'Error: ${snapshot.error}',
                                  style: FlutterFlowTheme.title3.override(
                                    fontFamily: 'Poppins',
                                    color: FlutterFlowTheme.primaryColor,
                                  ),
                                );
                              else
                                return Text(
                                  '${snapshot.data}',
                                  style: FlutterFlowTheme.title3.override(
                                    fontFamily: 'Poppins',
                                    color: FlutterFlowTheme.primaryColor,
                                  ),
                                );
                          }
                        },
                      ),
                      /* Text(
                        functions.getTokensInWallet(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ), */
                      Text(
                        ' tokens in ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'wallet',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions.getTokensInWalletValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        functions.getTokensInBONDFarm(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ),
                      Text(
                        ' BOND tokens in the ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'BOND farm',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions.getTokensInBONDFarmValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.azure,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        functions.getTokensInSWINGBYFarm(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ),
                      Text(
                        ' SWINGBY tokens in the ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'SWINGBY farm',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions
                            .getTokensInSWINGBYFarmValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.azure,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        functions.getTokensInXYZFarm(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ),
                      Text(
                        ' XYZ tokens in the ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'XYZ farm',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions.getTokensInXYZFarmValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.azure,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        functions.getTokensInSLPFarm(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ),
                      Text(
                        ' SLP tokens in the ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'STANDARD/USDC pool',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions.getTokensInSLPFarmValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        functions.getTokensStaked(widget.inputAddress),
                        style: FlutterFlowTheme.title3.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                        ),
                      ),
                      Text(
                        ' tokens staked in ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          color: FlutterFlowTheme.primaryColor,
                        ),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(2, 2, 2, 2),
                          child: Text(
                            'governance',
                            style: FlutterFlowTheme.bodyText1.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      Text(
                        ' valued at ',
                        style: FlutterFlowTheme.bodyText1,
                      ),
                      Text(
                        functions.getTokensStakedValue(widget.inputAddress),
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.azure,
                          fontWeight: FontWeight.w600,
                        ),
                      )
                    ],
                  )
                ],
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
