import Vector from 'vector-object'
import { VectorServiceInterface } from '@/data/contracts/vector-service'

export class VectorService implements VectorServiceInterface {
  create (object: object): any {
    return new Vector(object)
  }
}
