import { NextRequest, NextResponse } from 'next/server'
import { generateLargeDataset } from '@/lib/largeDataset'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '1000')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // Generate large dataset
    const fullDataset = generateLargeDataset(100000)
    
    // Apply pagination
    const paginatedData = fullDataset.slice(offset, offset + limit)
    
    return NextResponse.json({
      data: paginatedData,
      total: fullDataset.length,
      limit,
      offset,
      hasMore: offset + limit < fullDataset.length,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body
    
    switch (action) {
      case 'update':
        // Handle data update
        return NextResponse.json({ success: true, message: 'Data updated successfully' })
      
      case 'delete':
        // Handle data deletion
        return NextResponse.json({ success: true, message: 'Data deleted successfully' })
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
