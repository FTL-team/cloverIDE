import {
  rosGetServices,
  rosGetServiceType,
  rosGetServiceRequestDetails,
  ros,
  RosService
} from './core'

export async function getServiceType(serviceName: string) {
  return rosGetServiceType(serviceName)
}

export async function getServices() {
  return rosGetServices()
}

export async function getServiceRequestDetails(serviceName: string) {
  return rosGetServiceRequestDetails(serviceName)
}

export async function getService(serviceName: string): Promise<RosService> {
  const serviceType = await getServiceType(serviceName)
  return new RosService({
    ros,
    serviceType,
    name: serviceName
  })
}

export {
  RosService as Service,
  RosServiceRequest as ServiceRequest
} from './core'
