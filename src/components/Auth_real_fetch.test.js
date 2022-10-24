import {getMd5} from '../providers/md5Provider'

// test real fetch
// -------------------
it('should test pass', async () => {

    expect(true).toBe(true)
})

describe('Test API', () => {
    it('should get data', async () => {
        const data = await getMd5('janeczek')
        expect(data).toBe('8ae75b43f70f20ba564200ef4ab63a33')
    })
})











