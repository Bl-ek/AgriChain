async function getLastBlock(supabase) {
  const { data } = await supabase
    .from('blockchain')
    .select('*')
    .order('block_index', { ascending: false })
    .limit(1)
    .single()
  return data
}

async function calculateHash(data, previousHash, timestamp) {
  const msgBuffer = new TextEncoder().encode(`${data}${previousHash}${timestamp}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function addBlock(supabase, data) {
  const last = await getLastBlock(supabase)
  const previousHash = last ? last.hash : '0'
  const blockIndex = last ? last.block_index + 1 : 0
  const timestamp = new Date().toISOString()
  const hash = await calculateHash(data, previousHash, timestamp)

  await supabase.from('blockchain').insert({
    block_index: blockIndex,
    data,
    hash,
    previous_hash: previousHash,
    timestamp
  })

  return hash
}
