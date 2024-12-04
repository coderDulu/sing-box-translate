// Example:
// backend version(>2.14.148):
// $files: ['0', '1']
// $content: '0\n1'

// produce proxies
// backend version(>2.14.156):
const { type, name } = $arguments
let singboxProxies = await produceArtifact({
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  name, // subscription name
  platform: 'sing-box', // target platform
  produceType: 'internal' // 'internal' produces an Array, otherwise produces a String( JSON.parse('JSON String') )
})


function convertToSingBoxJson(singboxProxies) {
try {
  const template = JSON.parse($files[0])
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
const newProxies = convertToSingBoxJson(singboxProxies)
$content = JSON.stringify(newProxies, null, 2)
