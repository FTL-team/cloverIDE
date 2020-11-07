export interface Tool {
  name: string
  description: string
  command: string
  viewType: string
  script: string
}

export const tools: Tool[] = [
  {
    name: 'Topic visualization',
    script: 'topicVisView.js',
    description: 'Special tool to visualize in real-time any ros topic',
    viewType: 'topicVis',
    command: 'cloveride.topicVis'
  },
  {
    name: 'Image topic visualization',
    script: 'imageVisView.js',
    description: 'Special tool to view image in real-time any ros topic',
    viewType: 'imageVis',
    command: 'cloveride.imageVis'
  },
  {
    name: 'Service caller',
    script: 'serviceCallerView.js',
    description: 'Special tool to call ros services',
    viewType: 'serviceCaller',
    command: 'cloveride.serviceCaller'
  }
]
