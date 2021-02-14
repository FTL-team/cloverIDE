export interface Tool {
  name: string
  description: string
  viewType: string
}

export const tools: Tool[] = [
  {
    name: 'Topic visualization',
    description: 'Special tool to visualize in real-time any ros topic',
    viewType: 'topicVis'
  },
  {
    name: 'Image topic visualization',
    description: 'Special tool to view image in real-time any ros topic',
    viewType: 'imageVis'
  },
  {
    name: 'Service caller',
    description: 'Special tool to call ros services',
    viewType: 'serviceCaller'
  }
]
