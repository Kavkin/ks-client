export interface Risk {
  instanceId: string
  name: string
  status: string
  creator: string
  updator: string
  validationStateCd: string
  sourceSystemCd: string
  createdDttm: string
  data: unknown
}

export type CreateInputRisk = Omit<Risk, 'instance_id' | 'creator' | 'updator' | 'data'>

export type UpdateInputRisk = Risk
