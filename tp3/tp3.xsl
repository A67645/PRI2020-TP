<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>

    <xsl:template match="/">
      <html>
        <head>
          <title>Arqueossítios</title>
        </head>
        <body>
          <table width="100%" border="1">
            <tr>
              <td width="30%" valign="top">
                <a name="indice"/>
                <h3>Índice</h3>
                <ol>
                  <xsl:apply-templates mode="indice" select="//ARQELEM">
                    <xsl:sort select="IDENTI"/>
                  </xsl:apply-templates>
                </ol>
              </td>
              <td>
                <h3>Conteúdo</h3>
                <xsl:apply-templates select="//ARQELEM">
                  <xsl:sort data-type="text" select="TIPO/@ASSUNTO"/>
                  <xsl:sort data-type="text" select="IDENTI"/>
                  <xsl:sort data-type="text" select="IMAGEM/@NOME"/>
                  <xsl:sort data-type="text" select="DESCRI"/>
                  <xsl:sort data-type="text" select="CRONO"/>
                  <xsl:sort data-type="text" select="LUGAR"/>
                  <xsl:sort data-type="text" select="FREGUESIA"/>
                  <xsl:sort data-type="text" select="CONCEL"/>
                  <xsl:sort data-type="text" select="CODADM"/>
                  <xsl:sort data-type="text" select="LATITU"/>
                  <xsl:sort data-type="text" select="LONGITU"/>
                  <xsl:sort data-type="text" select="ALTITU"/>
                  <xsl:sort data-type="text" select="ACESSO"/>
                  <xsl:sort data-type="text" select="QUADRO"/>
                  <xsl:sort data-type="text" select="TRAARQ"/>
                  <xsl:sort data-type="text" select="DESARQ"/>
                  <xsl:sort data-type="text" select="INTERP"/>
                  <xsl:sort data-type="text" select="DEPOSI"/>
                  <xsl:sort data-type="text" select="BIBLIO"/>
                  <xsl:sort data-type="text" select="AUTOR"/>
                  <xsl:sort data-type="text" select="DATA"/>       
                </xsl:apply-templates>
              </td>
            </tr>
          </table>
        </body>
      </html>
    </xsl:template>
<!-- TEMPLATES PARA INDICE...............................................-->
  <xsl:template match="ARQELEM" mode="indice">
    <li>
      <a name="i{generate-id()}"/>
      <a href="IDENTI:{generate-id()}">
        <xsl:value-of select="IDENTI"/>
      </a>
    </li>
  </xsl:template>

  <!-- TEMPLATES PARA CONTEUDO...............................................-->
  <xsl:template match="ARQELEM">
    <a name="IDENTI:{generate-id()}"/>
    <p>
      <b>Assunto</b>:<xsl:value-of select="TIPO/@ASSUNTO"/>
    </p>
    <p>
      <b>Idêntificação</b>:<xsl:value-of select="IDENTI"/>
    </p>
    <xsl:if test="IMAGEM">
      <p>
        <b>Imagem</b>:<xsl:value-of select="IMAGEM/@NOME"/>
      </p>
    </xsl:if>
    <p>
      <b>Descrição</b>:<xsl:value-of select="DESCRI"/>
      <xsl:for-each select="DESCRI/LIGA">
        <b>Termo</b>:<xsl:value-of select="DESCRI/LIGA/@TERMO"/>
      </xsl:for-each>
    </p>
    <xsl:if test="CRONO">
      <p>
        <b>Localização Cromológica</b>:
        <xsl:value-of select="CRONO"/>
      </p>
    </xsl:if>
    <p>
      <b>Lugar</b>:<xsl:value-of select="LUGAR"/>
    </p>
    <p>
      <b>Frequesia</b>:<xsl:value-of select="FREGUESIA"/>
    </p>
    <p>
      <b>Concelho</b>:<xsl:value-of select="CONCEL"/>
    </p>
    <p>
      <b>Codadm</b>:<xsl:value-of select="CODADM"/>
    </p>
    <p>
      <b>Latitude</b>:<xsl:value-of select="LATITU"/>
    </p>
    <p>
      <b>Longitude</b>:<xsl:value-of select="LONGIT"/>
    </p>
    <p>
      <b>Altitude</b>:<xsl:value-of select="ALTITU"/>
    </p>
    <p>
      <b>Acesso</b>:<xsl:value-of select="ACESSO"/>
      <xsl:for-each select="ACESSO/LIGA">
        <b>Termo</b>:<xsl:value-of select="ACESSO/LIGA/@TERMO"/>
      </xsl:for-each>
    </p>
    <p>
      <b>Quadro</b>:<xsl:value-of select="QUADRO"/>
    </p>
    <xsl:if test="TRAARQ">
      <p>
        <b>Traarq</b>:<xsl:value-of select="TRAARQ"/>
      </p>
    </xsl:if>
    <p>
      <b>Desarq</b>:<xsl:value-of select="DESARQ"/>
      <xsl:for-each select="DESARQ/LIGA">
        <b>Termo</b>:<xsl:value-of select="DESARQ/LIGA/@TERMO"/>
      </xsl:for-each>
    </p>
    <p>
      <b>Interpretação</b>:<xsl:value-of select="INTERP"/>
      <xsl:for-each select="INTERP/LIGA">
        <b>Termo</b>:<xsl:value-of select="INTERP/LIGA/@TERMO"/>
      </xsl:for-each>
    </p>
    <xsl:if test="DEPOSI">
      <p>
        <b>Depósito</b>:<xsl:value-of select="DEPOSI"/>
      </p>
    </xsl:if>
    <p>
      <b>Bibliografia</b>:<xsl:value-of select="BIBLIO"/>
      <xsl:for-each select="BIBLIO/LIGA">
        <b>Termo</b>:<xsl:value-of select="BIBLIO/LIGA/@TERMO"/>
      </xsl:for-each>
    </p>
    <p>
      <b>Autor</b>:<xsl:value-of select="AUTOR"/>
    </p>
    <p>
      <b>Data</b>:<xsl:value-of select="DATA"/>
    </p>
    <address>
      [<a href="#i{generate-id()}">Voltar ao índice</a>]
    </address>
    <center>
      <hr width="80%"/>
    </center>
  </xsl:template>
</xsl:stylesheet>
