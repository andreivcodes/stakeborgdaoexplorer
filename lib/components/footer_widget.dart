import 'package:flutter/services.dart';

import '../flutter_flow/flutter_flow_icon_button.dart';
import '../flutter_flow/flutter_flow_theme.dart';
import '../flutter_flow/flutter_flow_util.dart';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class FooterWidget extends StatefulWidget {
  FooterWidget({Key key}) : super(key: key);

  bool donationHeart = false;

  @override
  _FooterWidgetState createState() => _FooterWidgetState();
}

class _FooterWidgetState extends State<FooterWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
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
                  child: AutoSizeText(
                    '0x7a3A59fC82ed8c2b1a4\n259f2DFA9a984527D8F04',
                    style: FlutterFlowTheme.bodyText1.override(
                      fontFamily: 'Poppins',
                      color: FlutterFlowTheme.azure,
                      fontSize: 10,
                      fontWeight: FontWeight.w200,
                    ),
                  ),
                ),
                !widget.donationHeart
                    ? FlutterFlowIconButton(
                        borderColor: Colors.transparent,
                        borderRadius: 30,
                        borderWidth: 1,
                        buttonSize: 50,
                        fillColor: FlutterFlowTheme.ghostWhite,
                        icon: Icon(
                          Icons.content_copy,
                          color: FlutterFlowTheme.primaryColor,
                          size: 25,
                        ),
                        onPressed: () {
                          Clipboard.setData(ClipboardData(
                              text:
                                  "***REMOVED***"));
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
    );
  }
}
