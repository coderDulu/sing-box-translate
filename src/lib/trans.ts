import template from '../template.json';


export async function convertToSingBoxJson(url: string) {
  try {
    const ADD_TAG = '🚀 节点选择';
    const newTemplate = JSON.parse(JSON.stringify(template))
    const json = await fetch(url).then((res) => res.json());
    const { outbounds } = json;
    // 添加规则
    newTemplate.outbounds.push(...outbounds);

    const tags = outbounds.map((item: any) => item.tag);

    // 给不同的tag添加不同的规则
    newTemplate.outbounds.forEach((item: any) => {
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
