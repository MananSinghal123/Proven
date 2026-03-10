/* ═══════════════════════════════════════════════════════════════════════════════
 *  Proven – Uniswap v4 pool utility helpers
 *
 *  Handles token sorting, sqrtPriceX96 computation, PoolKey construction,
 *  and fee→tickSpacing mapping needed to initialize pools from the frontend.
 * ═══════════════════════════════════════════════════════════════════════════════ */

import { VESTING_HOOK_ADDRESS } from '../config/constants'

/* ─── Fee tier → tick spacing mapping (matches Uniswap v4 defaults) ─── */
export const FEE_TIER_MAP: Record<number, { fee: number; tickSpacing: number }> = {
  0.01: { fee: 100, tickSpacing: 1 },
  0.05: { fee: 500, tickSpacing: 10 },
  0.3: { fee: 3000, tickSpacing: 60 },
  1.0: { fee: 10000, tickSpacing: 200 },
}

/* ─── Sort two token addresses (currency0 < currency1 numerically) ─── */
export function sortTokens(
  tokenA: `0x${string}`,
  tokenB: `0x${string}`,
): { currency0: `0x${string}`; currency1: `0x${string}`; isToken0: boolean } {
  const a = BigInt(tokenA)
  const b = BigInt(tokenB)
  if (a < b) {
    return { currency0: tokenA, currency1: tokenB, isToken0: true }
  }
  return { currency0: tokenB, currency1: tokenA, isToken0: false }
}

/* ─── Compute sqrtPriceX96 for a 1:1 price ─── */
// sqrtPriceX96 = sqrt(price) * 2^96
// For 1:1 price (1 token0 = 1 token1), sqrt(1) * 2^96 = 2^96
export const SQRT_PRICE_1_1 = 79228162514264337593543950336n // 2^96 exactly

/* ─── Compute sqrtPriceX96 from a human-readable price ratio ─── */
// price = amount1 / amount0 (how many token1 per token0)
// sqrtPriceX96 = sqrt(price) * 2^96
export function computeSqrtPriceX96(amount0: bigint, amount1: bigint): bigint {
  if (amount0 === 0n || amount1 === 0n) return SQRT_PRICE_1_1

  // We compute: sqrt(amount1 / amount0) * 2^96
  // To avoid floating point: sqrt(amount1 * 2^192 / amount0)
  // This is equivalent to: sqrt(amount1) * 2^96 / sqrt(amount0)
  const Q192 = 1n << 192n
  const ratio = (amount1 * Q192) / amount0
  return sqrt(ratio)
}

/* ─── Integer square root (Newton's method) ─── */
function sqrt(x: bigint): bigint {
  if (x === 0n) return 0n
  let z = x
  let y = (z + 1n) / 2n
  while (y < z) {
    z = y
    y = (z + x / z) / 2n
  }
  return z
}

/* ─── Build a PoolKey tuple for viem ─── */
export interface PoolKeyTuple {
  currency0: `0x${string}`
  currency1: `0x${string}`
  fee: number
  tickSpacing: number
  hooks: `0x${string}`
}

export function buildPoolKey(
  tokenA: `0x${string}`,
  tokenB: `0x${string}`,
  feeTierPct: number,
): PoolKeyTuple {
  const { currency0, currency1 } = sortTokens(tokenA, tokenB)
  const tierConfig = FEE_TIER_MAP[feeTierPct] ?? FEE_TIER_MAP[0.3]

  return {
    currency0,
    currency1,
    fee: tierConfig.fee,
    tickSpacing: tierConfig.tickSpacing,
    hooks: VESTING_HOOK_ADDRESS,
  }
}

/* ─── Compute PoolId (keccak256 of the PoolKey) ─── */
// Matches PoolId.sol: keccak256(abi.encode(key))
import { encodeAbiParameters, keccak256 } from 'viem'

export function computePoolId(key: PoolKeyTuple): `0x${string}` {
  const encoded = encodeAbiParameters(
    [
      {
        type: 'tuple',
        components: [
          { name: 'currency0', type: 'address' },
          { name: 'currency1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'tickSpacing', type: 'int24' },
          { name: 'hooks', type: 'address' },
        ],
      },
    ],
    [key],
  )
  return keccak256(encoded)
}

/* ─── Default tick range for full-range liquidity ─── */
export function fullRangeTicks(tickSpacing: number): { tickLower: number; tickUpper: number } {
  // MAX_TICK = 887272, MIN_TICK = -887272
  // Round to nearest tick spacing
  const maxTick = Math.floor(887272 / tickSpacing) * tickSpacing
  return {
    tickLower: -maxTick,
    tickUpper: maxTick,
  }
}
