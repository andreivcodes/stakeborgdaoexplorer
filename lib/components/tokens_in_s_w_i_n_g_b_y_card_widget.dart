import '../flutter_flow/flutter_flow_theme.dart';
import '../flutter_flow/flutter_flow_util.dart';
import '../flutter_flow/custom_functions.dart' as functions;
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:google_fonts/google_fonts.dart';

class TokensInSWINGBYCardWidget extends StatefulWidget {
  TokensInSWINGBYCardWidget({
    Key key,
    this.address,
  }) : super(key: key);

  final String address;

  @override
  _TokensInSWINGBYCardWidgetState createState() =>
      _TokensInSWINGBYCardWidgetState();
}

class _TokensInSWINGBYCardWidgetState extends State<TokensInSWINGBYCardWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsetsDirectional.fromSTEB(5, 5, 5, 5),
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
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
                padding: EdgeInsetsDirectional.fromSTEB(5, 5, 5, 5),
                child: FutureBuilder<String>(
                  future: functions
                      .getTokensInSWINGBYFarm(widget.address), // async work
                  builder:
                      (BuildContext context, AsyncSnapshot<String> snapshot) {
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
                            double.parse(snapshot.data).toStringAsFixed(3),
                            style: FlutterFlowTheme.title3.override(
                              fontFamily: 'Poppins',
                              color: FlutterFlowTheme.primaryColor,
                            ),
                          );
                    }
                  },
                ) /* Text(
                functions.getTokensInSWINGBYFarm(widget.address),
                style: FlutterFlowTheme.title3.override(
                  fontFamily: 'Poppins',
                  color: FlutterFlowTheme.primaryColor,
                ),
              ), */
                ),
            Text(
              ' tokens in ',
              style: FlutterFlowTheme.bodyText1.override(
                fontFamily: 'Poppins',
                color: Color(0xFF7D7D7D),
                fontSize: 14,
              ),
            ),
            Padding(
              padding: EdgeInsetsDirectional.fromSTEB(5, 5, 5, 5),
              child: Text(
                'SWINGBY farm',
                style: FlutterFlowTheme.bodyText1.override(
                  fontFamily: 'Poppins',
                  color: FlutterFlowTheme.primaryColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Text(
              ' valued at ',
              style: FlutterFlowTheme.bodyText1.override(
                fontFamily: 'Poppins',
                color: Color(0xFF7D7D7D),
                fontSize: 14,
              ),
            ),
            FutureBuilder<String>(
              future: functions
                  .getTokensInSWINGBYFarmValue(widget.address), // async work
              builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
                switch (snapshot.connectionState) {
                  case ConnectionState.waiting:
                    return Text(
                      'Loading...',
                      style: FlutterFlowTheme.bodyText1.override(
                        fontFamily: 'Poppins',
                        color: FlutterFlowTheme.primaryColor,
                        fontWeight: FontWeight.w600,
                      ),
                    );
                  default:
                    if (snapshot.hasError)
                      return Text(
                        'Error: ${snapshot.error}',
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      );
                    else
                      return Text(
                        '${double.parse(snapshot.data).toStringAsFixed(1)} \$',
                        style: FlutterFlowTheme.bodyText1.override(
                          fontFamily: 'Poppins',
                          color: FlutterFlowTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      );
                }
              },
            )
            /* Text(
              functions.getTokensInSWINGBYFarmValue(widget.address),
              style: FlutterFlowTheme.bodyText1.override(
                fontFamily: 'Poppins',
                color: FlutterFlowTheme.primaryColor,
                fontWeight: FontWeight.w600,
              ),
            ) */
          ],
        ),
      ),
    );
  }
}
