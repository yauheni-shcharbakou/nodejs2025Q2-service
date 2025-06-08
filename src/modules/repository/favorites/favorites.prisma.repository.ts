import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { IFavoritesRepository } from './favorites.repository.interface';
import { IFavorites, IFavoritesAdd } from 'src/models/favorites.model';

@Injectable()
export class FavoritesPrismaRepository implements IFavoritesRepository {
  constructor(protected readonly model: Prisma.FavoritesDelegate) {}

  // async onModuleInit(): Promise<void> {
  //   await this.model.upsert({
  //     where: { id: randomUUID() },
  //     create: {},
  //     update: {},
  //   });
  // }

  async find(): Promise<IFavorites> {
    return this.model.findFirst({
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
  }

  async add(data: IFavoritesAdd): Promise<void> {
    const favorites = await this.model.findFirst();

    await this.model.update({
      where: { id: favorites.id },
      data: Object.keys(data).reduce((acc, key) => {
        acc[`${key}s`] = { connect: data[key] };
        return acc;
      }, {}),
    });
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    const favorites = await this.model.findFirst({
      include: {
        albums: {
          where: { id: albumId },
        },
      },
    });

    if (!favorites.albums?.length) {
      return false;
    }

    await this.model.update({
      where: { id: favorites.id },
      data: { albums: { disconnect: { id: albumId } } },
    });

    return true;

    // const isExists = await this.prismaService.album.findFirst({
    //   where: { id: albumId, favoritesId: { not: null } },
    //   select: { id: true },
    // });
    //
    // if (!isExists) {
    //   return false;
    // }
    //
    // await this.prismaService.favorites.update({
    //   where: { albums: { some: { id: albumId } } },
    //   data: { albums: { disconnect: { id: albumId } } },
    // });
    // return !isExists;
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    const favorites = await this.model.findFirst({
      include: {
        artists: {
          where: { id: artistId },
        },
      },
    });

    if (!favorites.artists?.length) {
      return false;
    }

    await this.model.update({
      where: { id: favorites.id },
      data: { artists: { disconnect: { id: artistId } } },
    });

    return true;
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    const favorites = await this.model.findFirst({
      include: {
        tracks: {
          where: { id: trackId },
        },
      },
    });

    if (!favorites.tracks?.length) {
      return false;
    }

    await this.model.update({
      where: { id: favorites.id },
      data: { tracks: { disconnect: { id: trackId } } },
    });

    return true;
  }
}
