import { CosineSimilarityCalculatorInterface } from '@/domain/features/cosine-similarity-calculator-service'
import { infoLogger } from '@/infra/logger/logger'

export class SimilarityCalculatorService implements CosineSimilarityCalculatorInterface {
  MAX_SIMILAR = 5 // Número de resultados similares que quero retornar

  MIN_SCORE = 0.2 // Mínimo de similaridade de coseno necessária que deve ser retornado

  perform (docVectors: any): any {
    infoLogger('[DATA][SimilarityCalculatorService][perform]')
    const data: any = {}

    for (let i = 0; i < docVectors.length; i += 1) {
      const documentVector = docVectors[i]
      const { id } = documentVector

      data[id] = []
    }

    for (let i = 0; i < docVectors.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        const idi = docVectors[i].id
        const vi = docVectors[i].vector
        const idj = docVectors[j].id
        const vj = docVectors[j].vector
        const similarity = vi.getCosineSimilarity(vj)

        if (similarity > this.MIN_SCORE) {
          data[idi].push({ id: idj, score: similarity })
          data[idj].push({ id: idi, score: similarity })
        }
      }
    }

    Object.keys(data).forEach(id => {
      data[id].sort((a: any, b: any) => b.score - a.score)

      if (data[id].length > this.MAX_SIMILAR) {
        data[id] = data[id].slice(0, this.MAX_SIMILAR)
      }
    })

    return data
  }
}
