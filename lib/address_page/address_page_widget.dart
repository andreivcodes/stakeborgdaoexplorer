import 'package:flutter/services.dart';
import 'package:stakeborgdaoexplorer/components/footer_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_in_b_o_n_d_card_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_in_s_l_p_card_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_in_s_w_i_n_g_b_y_card_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_in_wallet_card_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_in_x_y_z_card_widget.dart';
import 'package:stakeborgdaoexplorer/components/tokens_staked_card_widget.dart';

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
import 'package:intl/intl.dart' as intl;

class AddressPageWidget extends StatefulWidget {
  static const String route = '/address';

  AddressPageWidget({
    Key key,
    this.inputAddress,
  }) : super(key: key);

  final String inputAddress;

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
                  color: Color(0xFFEEEEEE),
                ),
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
                              padding:
                                  EdgeInsetsDirectional.fromSTEB(0, 45, 0, 25),
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
                                      child: SvgPicture.asset(
                                        'assets/images/stakeborg-dark-bg.svg',
                                        width: 80,
                                        height: 80,
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Row(
                                          mainAxisSize: MainAxisSize.max,
                                          children: [
                                            Text(
                                              'Stakeborg',
                                              style: FlutterFlowTheme.title1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme.white,
                                              ),
                                            ),
                                            Text(
                                              'DAO',
                                              style: FlutterFlowTheme.title1
                                                  .override(
                                                fontFamily: 'Poppins',
                                                color: FlutterFlowTheme
                                                    .primaryColor,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            )
                                          ],
                                        ),
                                        Text(
                                          'Explorer',
                                          style:
                                              FlutterFlowTheme.title2.override(
                                            fontFamily: 'Poppins',
                                            color: FlutterFlowTheme.azure,
                                            fontWeight: FontWeight.normal,
                                          ),
                                        ),
                                        FutureBuilder<String>(
                                          future: functions
                                              .getUserAddress(), // async work
                                          builder: (BuildContext context,
                                              AsyncSnapshot<String> snapshot) {
                                            switch (snapshot.connectionState) {
                                              case ConnectionState.waiting:
                                                return Text(
                                                  'Loading...',
                                                  style: FlutterFlowTheme
                                                      .bodyText1
                                                      .override(
                                                    fontFamily: 'Poppins',
                                                    color:
                                                        FlutterFlowTheme.white,
                                                  ),
                                                );
                                              default:
                                                if (snapshot.hasError)
                                                  return Text(
                                                    'Error: ${snapshot.error}',
                                                    style: FlutterFlowTheme
                                                        .bodyText1
                                                        .override(
                                                      fontFamily: 'Poppins',
                                                      color: FlutterFlowTheme
                                                          .white,
                                                    ),
                                                  );
                                                else
                                                  return Text(
                                                    '${snapshot.data}',
                                                    style: FlutterFlowTheme
                                                        .bodyText1
                                                        .override(
                                                      fontFamily: 'Poppins',
                                                      color: FlutterFlowTheme
                                                          .white,
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
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      12, 0, 12, 0),
                                  child: Container(
                                    width: double.infinity,
                                    decoration: BoxDecoration(),
                                    child: Text(
                                      'Search for an address to see information about it',
                                      textAlign: TextAlign.start,
                                      style:
                                          FlutterFlowTheme.bodyText1.override(
                                        fontFamily: 'Poppins',
                                        color: Color(0xFF222E50),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      10, 10, 10, 10),
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
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          5, 0, 5, 0),
                                      child: TextFormField(
                                        onChanged: (_) => {},
                                        onFieldSubmitted: (_) async {
                                          await Navigator.push(
                                            context,
                                            PageTransition(
                                              type: PageTransitionType
                                                  .bottomToTop,
                                              duration:
                                                  Duration(milliseconds: 300),
                                              reverseDuration:
                                                  Duration(milliseconds: 300),
                                              child: AddressPageWidget(
                                                inputAddress:
                                                    textController.text,
                                              ),
                                            ),
                                          );
                                        },
                                        controller: textController,
                                        obscureText: false,
                                        decoration: InputDecoration(
                                          hintText: '0xDeAdBeEf...',
                                          hintStyle: FlutterFlowTheme.bodyText1
                                              .override(
                                            fontFamily: 'Poppins',
                                            color: Color(0xFF7D7D7D),
                                          ),
                                          enabledBorder: UnderlineInputBorder(
                                            borderSide: BorderSide(
                                              color: Color(0x00000000),
                                              width: 1,
                                            ),
                                            borderRadius:
                                                const BorderRadius.only(
                                              topLeft: Radius.circular(4.0),
                                              topRight: Radius.circular(4.0),
                                            ),
                                          ),
                                          focusedBorder: UnderlineInputBorder(
                                            borderSide: BorderSide(
                                              color: Color(0x00000000),
                                              width: 1,
                                            ),
                                            borderRadius:
                                                const BorderRadius.only(
                                              topLeft: Radius.circular(4.0),
                                              topRight: Radius.circular(4.0),
                                            ),
                                          ),
                                          suffixIcon: textController
                                                  .text.isNotEmpty
                                              ? InkWell(
                                                  onTap: () => setState(
                                                    () =>
                                                        textController.clear(),
                                                  ),
                                                  child: Icon(
                                                    Icons.clear,
                                                    color: FlutterFlowTheme
                                                        .primaryColor,
                                                    size: 22,
                                                  ),
                                                )
                                              : null,
                                        ),
                                        style:
                                            FlutterFlowTheme.bodyText1.override(
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
                          Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(5, 5, 5, 5),
                            child: Text(
                              'owns',
                              style: FlutterFlowTheme.subtitle1.override(
                                fontFamily: 'Poppins',
                                color: Color(0xFF303030),
                                fontSize: 24,
                                fontWeight: FontWeight.w300,
                              ),
                            ),
                          ),
                          TokensInWalletCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          ),
                          TokensInBONDCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          ),
                          TokensInSWINGBYCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          ),
                          TokensInXYZCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          ),
                          TokensInSLPCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          ),
                          TokensStakedCardWidget(
                            address: valueOrDefault<String>(
                              widget.inputAddress,
                              '0x000000000000000000000000000000000000dEaD',
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
            FooterWidget()
          ],
        ),
      ),
    );
  }
}
