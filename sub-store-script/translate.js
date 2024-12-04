// Example:
// backend version(>2.14.148):
// $files: ['0', '1']
// $content: '0\n1'

// produce proxies
// backend version(>2.14.156):
const { type, name } = $arguments
const template = JSON.parse($files[0])

let singboxProxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})



function convertToSingBoxJson(singboxProxies, template) {
  try {
    const ADD_TAG = '🚀 节点选择';
    const newTemplate = JSON.parse(JSON.stringify(template));
    const { outbounds } = JSON.parse(JSON.stringify(singboxProxies));
    // 添加规则
    newTemplate.outbounds.push(...outbounds);
  
    const tags = outbounds.map((item) => item.tag);
  
    // 给不同的tag添加不同的规则
    newTemplate.outbounds.forEach((item) => {
      if (item.outbounds?.includes(ADD_TAG) || item.tag === ADD_TAG) {
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
const newProxies = convertToSingBoxJson(singboxProxies, template)
$content = JSON.stringify({}, null, 2)
