# encoding: utf-8

# encoding: utf-8
gem 'minitest'
require 'minitest/autorun'
require_relative '../../lib/importer/runner'
require_relative '../../lib/importer/job'
require_relative '../../lib/importer/downloader'
require_relative '../factories/pg_connection'

include CartoDB::Importer2

describe 'Mapinfo regression tests' do
  before do
    @pg_options  = Factories::PGConnection.new.pg_options
  end

  it 'imports Mapinfo files' do
    filepath    = "http://dl.dropboxusercontent.com/u/931536/Ivanovo.zip"
    downloader  = Downloader.new(filepath)
    runner      = Runner.new(@pg_options, downloader)
    runner.run

    geometry_type_for(runner).wont_be_nil
  end

  def path_to(filepath)
    File.expand_path(
      File.join(File.dirname(__FILE__), "../fixtures/#{filepath}")
    )
  end #path_to

  def geometry_type_for(runner)
    result      = runner.results.first
    table_name  = result.tables.first
    schema      = result.schema

    runner.db[%Q{
      SELECT public.GeometryType(the_geom)
      FROM "#{schema}"."#{table_name}"
    }].first.fetch(:geometrytype)
  end #geometry_type_for
end # Mapinfo regression tests
 

