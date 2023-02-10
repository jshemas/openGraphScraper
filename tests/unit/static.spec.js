const nock = require('nock');
const ogs = require('../../index');

const sandbox = sinon.createSandbox();

// TODO: Should ogVideo/ogImage default to the secure_url if it exists?
describe('static check meta tags', function () {
  afterEach(function () {
    sandbox.restore();
    nock.cleanAll();
  });

  it('check one off tags', function () {
    const metaHTML = `<html><head>
      <link rel="icon" type="image/png" href="https://bar.com/foo.png" />
      <meta charset="utf-8" />
      <meta property="og:description" name="og:description" content="the bar of foo" />
      <meta property="og:image" name="og:image" content="https://www.foo.com/bar.jpg" />
      <meta property="og:title" name="og:title" content="foobar" />
      <meta property="og:type" name="og:type" content="bar" />
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogDescription).to.be.eql('the bar of foo');
        expect(data.result.ogTitle).to.be.eql('foobar');
        expect(data.result.ogType).to.be.eql('bar');
        expect(data.result.ogImage).to.be.eql({
          url: 'https://www.foo.com/bar.jpg',
          width: null,
          height: null,
          type: 'jpg',
        });
        expect(data.result.favicon).to.be.eql('https://bar.com/foo.png');
        expect(data.result.charset).to.be.eql('utf8');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('article', function () {
    const metaHTML = `<html><head>
      <meta property="article:author" content="foo">
      <meta property="article:expiration_time" content="2000-01-03">
      <meta property="article:modified_time" content="2000-01-02">
      <meta property="article:published_time" content="2000-01-01">
      <meta property="article:section" content="bar">
      <meta property="article:tag" content="foobar">
      <meta property="og:type" content="article">
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.articleAuthor).to.be.eql('foo');
        expect(data.result.articleExpirationTime).to.be.eql('2000-01-03');
        expect(data.result.articleModifiedTime).to.be.eql('2000-01-02');
        expect(data.result.articlePublishedTime).to.be.eql('2000-01-01');
        expect(data.result.articleSection).to.be.eql('bar');
        expect(data.result.articleTag).to.be.eql('foobar');
        expect(data.result.ogType).to.be.eql('article');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('audio', function () {
    const metaHTML = `<html><head>
      <meta property="og:audio:secure_url" content="https://foo.com">
      <meta property="og:audio:type" content="audio/bar">
      <meta property="og:audio" content="http://foo.com">
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogAudio).to.be.eql('http://foo.com');
        expect(data.result.ogAudioSecureURL).to.be.eql('https://foo.com');
        expect(data.result.ogAudioType).to.be.eql('audio/bar');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('image', function () {
    const metaHTML = `<html><head>
      <meta property="og:image:height" content="2">
      <meta property="og:image:type" content="image/png">
      <meta property="og:image:width" content="1">
      <meta property="og:image" content="http://foobar.png">
      <meta property="og:image:secure_url" content="https://foobar.png">
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogImage).to.be.eql({
          url: 'http://foobar.png',
          width: '1',
          height: '2',
          type: 'image/png',
        });
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('twitter', function () {
    const metaHTML = `<html><head>
      <meta property="twitter:app:id:googleplay" name="twitter:app:id:googleplay" content="googlefoo" />
      <meta property="twitter:app:id:ipad" name="twitter:app:id:ipad" content="ipadfoo" />
      <meta property="twitter:app:id:iphone" name="twitter:app:id:iphone" content="iphonefoo" />
      <meta property="twitter:app:name:googleplay" name="twitter:app:name:googleplay" content="googlebar" />
      <meta property="twitter:app:name:ipad" name="twitter:app:name:ipad" content="ipadbar" />
      <meta property="twitter:app:name:iphone" name="twitter:app:name:iphone" content="iphonebar" />
      <meta property="twitter:card" name="twitter:card" content="foo" />
      <meta property="twitter:creator" name="twitter:creator" content="bar" />
      <meta property="twitter:description" name="twitter:description" content="the bar of foo" />
      <meta property="twitter:image" name="twitter:image" content="https://www.foo.com/bar.jpg" />
      <meta property="twitter:player:height" content="2">
      <meta property="twitter:player:width" content="1">
      <meta property="twitter:player" content="https://www.bar.com">
      <meta property="twitter:site" name="twitter:site" content="@foobar" />
      <meta property="twitter:title" name="twitter:title" content="the foo of bar" />
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.twitterAppIdGooglePlay).to.be.eql('googlefoo');
        expect(data.result.twitterAppIdiPad).to.be.eql('ipadfoo');
        expect(data.result.twitterAppIdiPhone).to.be.eql('iphonefoo');
        expect(data.result.twitterAppNameGooglePlay).to.be.eql('googlebar');
        expect(data.result.twitterAppNameiPad).to.be.eql('ipadbar');
        expect(data.result.twitterAppNameiPhone).to.be.eql('iphonebar');
        expect(data.result.twitterCard).to.be.eql('foo');
        expect(data.result.twitterCreator).to.be.eql('bar');
        expect(data.result.twitterDescription).to.be.eql('the bar of foo');
        expect(data.result.twitterSite).to.be.eql('@foobar');
        expect(data.result.twitterTitle).to.be.eql('the foo of bar');
        expect(data.result.twitterPlayer).to.be.eql({
          url: 'https://www.bar.com',
          width: '1',
          height: '2',
          stream: null,
        });
        expect(data.result.twitterImage).to.be.eql({
          url: 'https://www.foo.com/bar.jpg',
          width: null,
          height: null,
          alt: null,
        });
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('video', function () {
    const metaHTML = `<html><head>
      <meta property="og:video:height" content="2">
      <meta property="og:video:secure_url" content="https://www.foo.com">
      <meta property="og:video:type" content="text/bar">
      <meta property="og:video:url" content="http://www.foo.com">
      <meta property="og:video:width" content="1">
    </head></html>`;

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogVideo).to.be.eql({
          url: 'http://www.foo.com',
          width: '1',
          height: '2',
          type: 'text/bar',
        });
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('encoding - utf-8', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="utf-8">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.ogDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('楽天市場');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ');
        expect(data.result.twitterDescription).to.be.eql('楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。');
        expect(data.result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(data.result.twitterImage).to.be.eql({
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('utf8');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('encoding - sjis', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="sjis">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('縲先･ｽ螟ｩ蟶ょ�ｴ縲全hopping is Entertainment! �ｼ� 繧､繝ｳ繧ｿ繝ｼ繝阪ャ繝域怙螟ｧ邏壹�ｮ騾壻ｿ｡雋ｩ螢ｲ縲�騾夊ｲｩ繧ｪ繝ｳ繝ｩ繧､繝ｳ繧ｷ繝ｧ繝�繝斐Φ繧ｰ繧ｳ繝溘Η繝九ユ繧｣');
        // eslint-disable-next-line max-len
        // expect(data.result.ogDescription).to.be.eql('讌ｽ螟ｩ蟶ょ�ｴ縺ｯ繧､繝ｳ繧ｿ繝ｼ繝阪ャ繝磯夊ｲｩ縺梧･ｽ縺励ａ繧狗ｷ丞粋繧ｷ繝ｧ繝�繝斐Φ繧ｰ繝｢繝ｼ繝ｫ縲よ･ｽ螟ｩ繧ｹ繝ｼ繝代�ｼ繝昴う繝ｳ繝医′縺ｩ繧薙←繧楢ｲｯ縺ｾ繧具ｼ∽ｽｿ縺医ｋ�ｼ∵ｯ取律縺雁ｾ励↑繧ｯ繝ｼ繝昴Φ繧ゅゅ≠縺呎･ｽ蛻ｩ逕ｨ縺ｧ鄙梧律縺ｫ縺雁ｱ翫￠縲る｣溷刀縺九ｉ螳ｶ髮ｻ縲√ヵ繧｡繝�繧ｷ繝ｧ繝ｳ縲√�吶ン繝ｼ逕ｨ蜩√√さ繧ｹ繝｡縺ｾ縺ｧ縲∝��螳溘�ｮ蜩∵純縺医�');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('讌ｽ螟ｩ蟶ょ�ｴ');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('縲先･ｽ螟ｩ蟶ょ�ｴ縲全hopping is Entertainment! �ｼ� 繧､繝ｳ繧ｿ繝ｼ繝阪ャ繝域怙螟ｧ邏壹�ｮ騾壻ｿ｡雋ｩ螢ｲ縲�騾夊ｲｩ繧ｪ繝ｳ繝ｩ繧､繝ｳ繧ｷ繝ｧ繝�繝斐Φ繧ｰ繧ｳ繝溘Η繝九ユ繧｣');
        // eslint-disable-next-line max-len
        // expect(data.result.twitterDescription).to.be.eql('讌ｽ螟ｩ蟶ょ�ｴ縺ｯ繧､繝ｳ繧ｿ繝ｼ繝阪ャ繝磯夊ｲｩ縺梧･ｽ縺励ａ繧狗ｷ丞粋繧ｷ繝ｧ繝�繝斐Φ繧ｰ繝｢繝ｼ繝ｫ縲よ･ｽ螟ｩ繧ｹ繝ｼ繝代�ｼ繝昴う繝ｳ繝医′縺ｩ繧薙←繧楢ｲｯ縺ｾ繧具ｼ∽ｽｿ縺医ｋ�ｼ∵ｯ取律縺雁ｾ励↑繧ｯ繝ｼ繝昴Φ繧ゅゅ≠縺呎･ｽ蛻ｩ逕ｨ縺ｧ鄙梧律縺ｫ縺雁ｱ翫￠縲る｣溷刀縺九ｉ螳ｶ髮ｻ縲√ヵ繧｡繝�繧ｷ繝ｧ繝ｳ縲√�吶ン繝ｼ逕ｨ蜩√√さ繧ｹ繝｡縺ｾ縺ｧ縲∝��螳溘�ｮ蜩∵純縺医�');
        expect(data.result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(data.result.twitterImage).to.be.eql({
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('sjis');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });

  it('encoding - euc-jp', function () {
    /* eslint-disable max-len */
    const metaHTML = `<html><head>
      <meta charset="euc-jp">
      <meta property="og:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta property="og:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta property="og:image" content="https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="楽天市場">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@RakutenJP">
      <meta name="twitter:title" content="【楽天市場】Shopping is Entertainment! ： インターネット最大級の通信販売、通販オンラインショッピングコミュニティ">
      <meta name="twitter:description" content="楽天市場はインターネット通販が楽しめる総合ショッピングモール。楽天スーパーポイントがどんどん貯まる！使える！毎日お得なクーポンも。あす楽利用で翌日にお届け。食品から家電、ファッション、ベビー用品、コスメまで、充実の品揃え。">
      <meta name="twitter:image:src" content="https://r.r10s.jp/com/img/home/top/ogp.png">
    </head></html>`;
    /* eslint-enable max-len */

    nock('http://www.test.com').get('/').reply(200, metaHTML);

    return ogs({ url: 'www.test.com' })
      .then(function (data) {
        expect(data.result.success).to.be.eql(true);
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.ogTitle).to.be.eql('���罐遵ぉ絽���眼��Shopping is Entertainment! 鐚� ��ゃ�潟�帥�若�����������紊х��������篆∴鴬紕蚊�����莢������潟����ゃ�潟�激�с�������潟�違�潟����ャ��������');
        expect(data.result.ogDescription).to.be.eql('罐遵ぉ絽���眼����ゃ�潟�帥�若�����������莢����罐純��������膩������激�с�������潟�違�≪�若�����罐遵ぉ��鴻�若����若����ゃ�潟�����������������莢���障��鐚�篏帥�����鐚�罸���ャ��緇���������若����潟�����������罐遵�������х����ャ�����絮�������蕋����������絎狗�祉�������＜����激�с�潟����������主����������潟�鴻�＜�障�с�����絎����������������');
        expect(data.result.ogType).to.be.eql('website');
        expect(data.result.ogSiteName).to.be.eql('罐遵ぉ絽����');
        expect(data.result.twitterCard).to.be.eql('summary');
        expect(data.result.twitterSite).to.be.eql('@RakutenJP');
        expect(data.result.twitterTitle).to.be.eql('���罐遵ぉ絽���眼��Shopping is Entertainment! 鐚� ��ゃ�潟�帥�若�����������紊х��������篆∴鴬紕蚊�����莢������潟����ゃ�潟�激�с�������潟�違�潟����ャ��������');
        expect(data.result.twitterDescription).to.be.eql('罐遵ぉ絽���眼����ゃ�潟�帥�若�����������莢����罐純��������膩������激�с�������潟�違�≪�若�����罐遵ぉ��鴻�若����若����ゃ�潟�����������������莢���障��鐚�篏帥�����鐚�罸���ャ��緇���������若����潟�����������罐遵�������х����ャ�����絮�������蕋����������絎狗�祉�������＜����激�с�潟����������主����������潟�鴻�＜�障�с�����絎����������������');
        expect(data.result.ogImage).to.be.eql({
          url: 'https://web.archive.org/web/20170913045814im_/https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          type: 'png',
        });
        expect(data.result.twitterImage).to.be.eql({
          url: 'https://r.r10s.jp/com/img/home/top/ogp.png',
          width: null,
          height: null,
          alt: null,
        });
        expect(data.result.requestUrl).to.be.eql('http://www.test.com');
        expect(data.result.charset).to.be.eql('euc-jp');
        expect(data.response.body).to.be.eql(metaHTML);
        expect(data.response.rawBody).to.be.eql(Buffer.from(metaHTML, 'utf8'));
      });
  });
});
