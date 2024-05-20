import bunkers from '../../../data/bunkers'

export async function GET() {
  return Response.json({ bunkers })
}
