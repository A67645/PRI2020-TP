<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>

  <xsl:template match="/">
    <xsl:result-document hfer="site/index.html">
      <html>
        <head>
          <title>Arqueossítios no Noroeste Português</title>
        </head>
        <body>
          <ul>
            <xsl:apply.templates select="//ARQELEM[not(CONCEL=preceding::CONCEL)]">
              <xsl:sort select="normalize-space(CONCEL)"/>
            </xsl:apply.templates>
          </ul>
        </body>
      </html>
    </xsl:result-document>
    <xsl:apply-templates select="//ARQELEM" mode="individual">
      <xsl:sort select="normalize-space()"/>

    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="ARQELEM">
    <xsl:variable name="c" select="CONCEL"/>
    <li>
      <xsl:value-of select="CONCEL"/>
      <ul>
        <xsl:apply-templates select="//ARQELEM[CONCEL=$c]" mode="sublindice">
          <xsl:sort select="normalize-space(IDENTI)"/>
        </xsl:apply-templates>
      </ul>
    </li>
  </xsl:template>
  <xsl:template match="ARQELEM" mode="subindice">
    <li>
      <a href="{generate-id()}.html"/>
      <xsl:value-of select="IDENTI"/>
    </li>
  </xsl:template>
  <xsl:template match="ARQELEM" mode="individual">
    <xsl:result-document href="site/{generate-id()}.html">
      <head>
        <title>
          <xsl:value-of select="IDENTI"/>
        </title>
      </head>
      <body>
        <dl>
          <xsl:for-each select="./*">
            <dt>
              <xsl:value-of select="name(.)"/>
            </dt>
            <dd>
              <xsl:value-of select="."/>
            </dd>
          </xsl:for-each>
        </dl>
        <address>
          [<a href="index.html">Voltar ao Índice</a>]
        </address>
      </body>
    </xsl:result-document>
  </xsl:template>
</xsl:stylesheet>
