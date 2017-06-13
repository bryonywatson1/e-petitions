class UpdateArchivedPetitionIndexes < ActiveRecord::Migration
  def up
    execute "DROP INDEX index_archived_petitions_on_title;"
    execute "DROP INDEX index_archived_petitions_on_description;"

    execute <<-SQL
      CREATE INDEX index_archived_petitions_on_action
      ON archived_petitions USING gin(to_tsvector('english', action));
    SQL

    execute <<-SQL
      CREATE INDEX index_archived_petitions_on_background
      ON archived_petitions USING gin(to_tsvector('english', background));
    SQL

    execute <<-SQL
      CREATE INDEX index_archived_petitions_on_additional_details
      ON archived_petitions USING gin(to_tsvector('english', additional_details));
    SQL
  end

  def down
    execute "DROP INDEX index_archived_petitions_on_action;"
    execute "DROP INDEX index_archived_petitions_on_background;"
    execute "DROP INDEX index_archived_petitions_on_additional_details;"

    execute <<-SQL
      CREATE INDEX index_archived_petitions_on_title
      ON archived_petitions USING gin(to_tsvector('english', title));
    SQL

    execute <<-SQL
      CREATE INDEX index_archived_petitions_on_description
      ON archived_petitions USING gin(to_tsvector('english', description));
    SQL
  end
end
