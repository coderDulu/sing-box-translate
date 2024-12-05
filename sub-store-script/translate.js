/**
 * 给sing-box的订阅添加分流规则
 * @author coderDulu
 * @version 1.0.0
 * update: 2024-12-05
 * @example https://raw.githubusercontent.com/coderDulu/sing-box-translate/refs/heads/main/sub-store-script/translate.js#name=claw-sg
 * # 后面 name=后面是订阅名, type=后面是订阅类型
 * 模板：https://raw.githubusercontent.com/coderDulu/sing-box-translate/refs/heads/main/sub-store-script/template.json
 * 分流参考：https://github.com/DustinWin/ruleset_geodata?tab=readme-ov-file
 */
const { type, name } = $arguments;
const template = JSON.parse($files[0]);

// 需要添加tag的类型
const NEEDADDTAGTYPE = [
  ['🚀 节点选择', '节点选择', 'Selector'],
  ['网络测试', 'Network Test'],
  ['人工智能', 'AI'],
  ['奈飞视频', 'Netflix'],
  ['迪士尼+', 'Disney+'],
  ['Max'],
  ['Prime Video', 'Prime Video'],
  ['Apple TV+', 'Apple TV+'],
  ['油管', 'Youtube'],
  ['TikTok', 'TikTok'],
  ['哔哩哔哩', 'Bilibili'],
  ['电报', 'Telegram'],
];

let singboxProxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
});

function convertToSingBoxJson(singboxProxies, template) {
  try {
    const newTemplate = JSON.parse(JSON.stringify(template));
    // 添加规则
    newTemplate.outbounds.push(...singboxProxies);

    const tags = singboxProxies.map((item) => item.tag);

    // 给不同的tag添加不同的规则
    newTemplate.outbounds.forEach((item) => {
      // 将二维数组展平为一维数组，包含所有可能的匹配字符串
      const matchStrings = NEEDADDTAGTYPE.flat();
      // 如果item.tag包含任何一个匹配字符串，就添加tags
      if (matchStrings.some((matchStr) => item.tag.includes(matchStr))) {
        item.outbounds.push(...tags);
      }
    });
    return newTemplate;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// JSON
const newProxies = convertToSingBoxJson(singboxProxies, template);
$content = JSON.stringify(newProxies, null, 2);
